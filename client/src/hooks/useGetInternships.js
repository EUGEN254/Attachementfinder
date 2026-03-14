import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import internshipService from "../services/internshipService";

const useGetInternships = (
  initialFilters = {},
  initialPage = 1,
  initialLimit = 10,
) => {
  const queryClient = useQueryClient();
  
  // State for filters
  const [filters, setFilters] = useState({
    search: "",
    location: "",
    internship_type: "",
    experience_level: "",
    skills: "",
    min_stipend: "",
    max_stipend: "",
    ...initialFilters,
  });

  // State for pagination
  const [pagination, setPagination] = useState({
    page: initialPage,
    limit: initialLimit,
    total: 0,
    totalPages: 0,
  });

  // State for sorting
  const [sorting, setSorting] = useState({
    sort_by: "posted_at",
    sort_order: "desc",
  });

  // State for extracted filter options (still needed for UI)
  const [availableFilters, setAvailableFilters] = useState({
    locations: [],
    internship_types: [],
    experience_levels: [],
    allSkills: [],
  });

  // Build query params (same as before)
  const buildQueryParams = useCallback(() => {
    const params = {
      page: pagination.page,
      limit: pagination.limit,
      sort_by: sorting.sort_by,
      sort_order: sorting.sort_order,
    };

    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== "" && value !== null && value !== undefined) {
        params[key] = value;
      }
    });

    return params;
  }, [filters, pagination.page, pagination.limit, sorting]);

  // Extract filter options from data (same as before)
  const extractFilterOptions = (internshipsData) => {
    if (!internshipsData || !Array.isArray(internshipsData)) return;
    
    const locations = [
      ...new Set(internshipsData.map((item) => item.location).filter(Boolean)),
    ];
    const internship_types = [
      ...new Set(
        internshipsData.map((item) => item.internship_type).filter(Boolean),
      ),
    ];
    const experience_levels = [
      ...new Set(
        internshipsData.map((item) => item.experience_level).filter(Boolean),
      ),
    ];

    const allSkillsSet = new Set();
    internshipsData.forEach((item) => {
      if (item.required_skills && Array.isArray(item.required_skills)) {
        item.required_skills.forEach((skill) => allSkillsSet.add(skill));
      }
    });

    setAvailableFilters({
      locations,
      internship_types,
      experience_levels,
      allSkills: Array.from(allSkillsSet),
    });
  };

  // query key based on all parameters
  const queryKey = useMemo(() => 
    ['internships', filters, pagination.page, pagination.limit, sorting],
    [filters, pagination.page, pagination.limit, sorting]
  );

  // Use React Query for data fetching with caching
  const {
    data: queryData,
    isLoading,
    error: queryError,
    refetch,
    isFetching,
  } = useQuery({
    queryKey,//unique key for query
    queryFn: async ({ signal }) => {
      const params = buildQueryParams();
      console.log("📡 Fetching with params:", params);
      
      const response = await internshipService.getInternships(params, { signal });
      
      // Check if response has error from service
      if (response.error) {
        throw new Error(response.error.message || "Failed to fetch internships");
      }

      return response;
    },
    staleTime: 5 * 60 * 1000, // Data stays fresh for 5 minutes
    gcTime: 10 * 60 * 1000, // Cache persists for 10 minutes (formerly cacheTime)
    keepPreviousData: true, // Keep showing old data while fetching new
    retry: 1, // Retry failed requests once
    refetchOnWindowFocus: false, // Don't refetch when window gains focus
    refetchOnMount: false, // Don't refetch on mount if data exists and is fresh
    refetchOnReconnect: false, // Don't refetch on reconnection
  });

  // Process query data and update states
  useEffect(() => {
    if (queryData?.data?.success && Array.isArray(queryData.data.data)) {
      const internshipsData = queryData.data.data;
      
      // Update internships (you can access this directly from queryData in your component)
      // We'll store in state for backward compatibility with your component
      setInternships(internshipsData);
      
      setPagination((prev) => ({
        ...prev,
        total: queryData.data.pagination?.total || 0,
        totalPages: queryData.data.pagination?.total_pages || 0,
      }));

      // Extract filter options from the data
      if (internshipsData.length > 0) {
        extractFilterOptions(internshipsData);
      }
    } else if (queryData?.data && !queryData.data.success) {
      console.error("API returned unsuccessful response:", queryData);
    }
  }, [queryData]);

  // State for internships (keeping for backward compatibility)
  const [internships, setInternships] = useState([]);

  // Combine loading states
  const loading = isLoading || isFetching;

  // Error state
  const error = queryError ? queryError.message : null;

  // Filter update functions (same as before)
  const updateFilter = useCallback((key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
    setPagination((prev) => ({ ...prev, page: 1 }));
  }, []);

  const updateFilters = useCallback((newFilters) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
    }));
    setPagination((prev) => ({ ...prev, page: 1 }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({
      search: "",
      location: "",
      internship_type: "",
      experience_level: "",
      skills: "",
      min_stipend: "",
      max_stipend: "",
    });
    setPagination((prev) => ({ ...prev, page: 1 }));
  }, []);

  const hasActiveFilters = useMemo(() => {
    return Object.entries(filters).some(([key, value]) => {
      return value && value !== "" && value !== null && value !== undefined;
    });
  }, [filters]);

  const activeFiltersCount = useMemo(() => {
    return Object.entries(filters).filter(
      ([key, value]) =>
        value && value !== "" && value !== null && value !== undefined,
    ).length;
  }, [filters]);

  // Pagination functions (same as before)
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

  const setLimit = useCallback((newLimit) => {
    setPagination((prev) => ({
      ...prev,
      limit: newLimit,
      page: 1,
    }));
  }, []);

  // Sorting functions (same as before)
  const setSortingOrder = useCallback((sortBy, sortOrder) => {
    setSorting({
      sort_by: sortBy,
      sort_order: sortOrder,
    });
    setPagination((prev) => ({ ...prev, page: 1 }));
  }, []);

  // Refresh function
  const refresh = useCallback(() => {
    // Invalidate the query to force a refetch
    queryClient.invalidateQueries({ queryKey: ['internships'] });
  }, [queryClient]);

  // Prefetch next page for better UX
  useEffect(() => {
    if (pagination.page < pagination.totalPages) {
      const nextPageParams = {
        ...buildQueryParams(),
        page: pagination.page + 1,
      };
      
      queryClient.prefetchQuery({
        queryKey: ['internships', filters, pagination.page + 1, pagination.limit, sorting],
        queryFn: () => internshipService.getInternships(nextPageParams),
        staleTime: 5 * 60 * 1000,
      });
    }
  }, [pagination.page, pagination.totalPages, filters, pagination.limit, sorting, queryClient, buildQueryParams]);

  return {
    // Data
    internships,
    pagination,
    sorting,
    availableFilters,

    // Filters
    filters,
    updateFilter,
    updateFilters,
    clearFilters,
    hasActiveFilters,
    activeFiltersCount,

    // Pagination controls
    goToPage,
    nextPage,
    prevPage,
    setLimit,

    // Sorting controls
    setSortingOrder,

    // Status
    loading,
    error,

    // Utilities
    refresh,
    
    // Additional React Query specific values (optional)
    isFetching,
    queryData,
  };
};

export default useGetInternships;