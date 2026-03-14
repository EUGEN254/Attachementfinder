import axiosInstance from "../configs/axios";

// base url
const BASE_URL = "/api/internships";

// service functions for internship-related apis
const internshipService = {
  // get all internships - UPDATED with abort signal support
  getInternships: async (params = {}, options = {}) => {
    try {
      const response = await axiosInstance.get(BASE_URL, { 
        params,
        signal: options.signal, 
      });
      console.log(response);
      
      return {
        data: response.data,
      };
    } catch (error) {
      // Check if this is an abort error
      if (error.name === 'AbortError' || error.code === 'ERR_CANCELED') {
        console.log('Request was cancelled');
        // Return a special cancelled flag instead of error
        return { cancelled: true };
      }
      
      return {
        error: error.response
          ? error.response.data
          : { message: error.message },
      };
    }
  },
};

export default internshipService;