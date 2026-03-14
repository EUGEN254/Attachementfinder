import axiosInstance from "../configs/axios";

const BASE_URL = "/api/applications";

const applicationService = {
  // Apply for an internship
  apply: async (internshipId, applicationData) => {
    try {
      const response = await axiosInstance.post(`${BASE_URL}/apply/${internshipId}`, applicationData);
      return {
        data: response.data,
      };
    } catch (error) {
      return {
        error: error.response
          ? error.response.data
          : { message: error.message },
      };
    }
  },

  // Get applications for a student (to show in their dashboard)
  getStudentApplications: async (params = {}) => {
    try {
      const response = await axiosInstance.get(`${BASE_URL}/student`, { params });
      return {
        data: response.data,
      };
    } catch (error) {
      return {
        error: error.response
          ? error.response.data
          : { message: error.message },
      };
    }
  },

  // Get applications for a company (to see who applied)
  getCompanyApplications: async (params = {}) => {
    try {
      const response = await axiosInstance.get(`${BASE_URL}/company`, { params });
      return {
        data: response.data,
      };
    } catch (error) {
      return {
        error: error.response
          ? error.response.data
          : { message: error.message },
      };
    }
  },

  // Update application status (for companies)
  updateApplicationStatus: async (applicationId, status) => {
    try {
      const response = await axiosInstance.patch(`${BASE_URL}/${applicationId}/status`, { status });
      return {
        data: response.data,
      };
    } catch (error) {
      return {
        error: error.response
          ? error.response.data
          : { message: error.message },
      };
    }
  },

  // Withdraw application (for students)
  withdrawApplication: async (applicationId) => {
    try {
      const response = await axiosInstance.delete(`${BASE_URL}/${applicationId}`);
      return {
        data: response.data,
      };
    } catch (error) {
      return {
        error: error.response
          ? error.response.data
          : { message: error.message },
      };
    }
  },
};

export default applicationService;