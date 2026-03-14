import { useState, useEffect, useCallback, useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import applicationService from "../services/applicationService";
import { toast } from "sonner";

const useStudentApplications = (initialStatus = "all") => {
  const queryClient = useQueryClient();
  
  // State for filters
  const [selectedStatus, setSelectedStatus] = useState(initialStatus);
  
  // State for pagination
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 50, // Get a reasonable number
    total: 0,
    totalPages: 0,
  });

  // Build query params
  const buildQueryParams = useCallback(() => {
    const params = {
      page: pagination.page,
      limit: pagination.limit,
    };

    // Add status filter if not "all"
    if (selectedStatus !== "all") {
      params.status = selectedStatus;
    }

    return params;
  }, [pagination.page, pagination.limit, selectedStatus]);

  // Query key based on parameters
  const queryKey = useMemo(
    () => ["studentApplications", selectedStatus, pagination.page, pagination.limit],
    [selectedStatus, pagination.page, pagination.limit]
  );

  // Use React Query for data fetching
  const {
    data: queryData,
    isLoading,
    isFetching,
    error: queryError,
    refetch,
  } = useQuery({
    queryKey,
    queryFn: async ({ signal }) => {
      const params = buildQueryParams();
      console.log("📡 Fetching applications with params:", params);
      
      const response = await applicationService.getStudentApplications(params, { signal });
      
      if (response.error) {
        throw new Error(response.error.message || "Failed to fetch applications");
      }

      return response;
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
    keepPreviousData: true,
    retry: 1,
    refetchOnWindowFocus: false,
    enabled: true, // Always enabled when hook is used
  });

  // Process applications data
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    if (queryData?.data?.success && Array.isArray(queryData.data.data)) {
      const applicationsData = queryData.data.data;
      setApplications(applicationsData);
      
      setPagination((prev) => ({
        ...prev,
        total: queryData.data.pagination?.total || 0,
        totalPages: queryData.data.pagination?.total_pages || 0,
      }));
    } else if (queryData?.data && !queryData.data.success) {
      console.error("API returned unsuccessful response:", queryData);
    }
  }, [queryData]);

  // Calculate status counts
  const statusCounts = useMemo(() => {
    return {
      all: applications.length,
      pending: applications.filter(app => 
        app.status?.toLowerCase() === "pending" || 
        app.status?.toLowerCase() === "under review"
      ).length,
      interview: applications.filter(app => 
        app.status?.toLowerCase() === "interview scheduled"
      ).length,
      accepted: applications.filter(app => 
        app.status?.toLowerCase() === "accepted"
      ).length,
      rejected: applications.filter(app => 
        app.status?.toLowerCase() === "rejected" ||
        app.status?.toLowerCase() === "withdrawn"
      ).length,
    };
  }, [applications]);

  // Filter applications based on selected status (client-side filtering)
  const filteredApplications = useMemo(() => {
    if (selectedStatus === "all") return applications;
    
    return applications.filter((app) => {
      const status = app.status?.toLowerCase();
      switch (selectedStatus) {
        case "pending":
          return status === "pending" || status === "under review";
        case "interview":
          return status === "interview scheduled";
        case "accepted":
          return status === "accepted";
        case "rejected":
          return status === "rejected" || status === "withdrawn";
        default:
          return true;
      }
    });
  }, [applications, selectedStatus]);

  // Withdraw application
  const withdrawApplication = useCallback(async (applicationId) => {
    if (!window.confirm("Are you sure you want to withdraw this application?")) {
      return { success: false, cancelled: true };
    }

    const toastId = toast.loading("Withdrawing application...");

    try {
      const response = await applicationService.withdrawApplication(applicationId);

      if (response.error) {
        toast.error("Failed to withdraw application", {
          id: toastId,
          description: response.error.message,
        });
        return { success: false, error: response.error };
      } else {
        toast.success("Application withdrawn", {
          id: toastId,
          description: "Your application has been withdrawn successfully",
        });
        
        // Invalidate and refetch applications
        queryClient.invalidateQueries({ queryKey: ["studentApplications"] });
        
        return { success: true, data: response.data };
      }
    } catch (err) {
      toast.error("Error", {
        id: toastId,
        description: "Failed to withdraw application",
      });
      return { success: false, error: err };
    }
  }, [queryClient]);

  // Change status filter
  const changeStatusFilter = useCallback((status) => {
    setSelectedStatus(status);
    setPagination((prev) => ({ ...prev, page: 1 }));
  }, []);

  // Refresh applications
  const refresh = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ["studentApplications"] });
  }, [queryClient]);

  // Loading and error states
  const loading = isLoading || isFetching;
  const error = queryError ? queryError.message : null;

  // Pagination controls
  const goToPage = useCallback((newPage) => {
    setPagination((prev) => ({
      ...prev,
      page: Math.max(1, Math.min(newPage, prev.totalPages || 1)),
    }));
  }, []);

  const nextPage = useCallback(() => {
    setPagination((prev) => ({
      ...prev,
      page: Math.min(prev.page + 1, prev.totalPages),
    }));
  }, []);

  const prevPage = useCallback(() => {
    setPagination((prev) => ({
      ...prev,
      page: Math.max(prev.page - 1, 1),
    }));
  }, []);

  return {
    // Data
    applications: filteredApplications,
    allApplications: applications,
    pagination,
    statusCounts,
    selectedStatus,

    // Actions
    changeStatusFilter,
    withdrawApplication,
    refresh,
    
    // Pagination controls
    goToPage,
    nextPage,
    prevPage,

    // Status
    loading,
    error,
    isFetching,

    // Utilities
    hasApplications: applications.length > 0,
    isEmpty: applications.length === 0,
  };
};

export default useStudentApplications;