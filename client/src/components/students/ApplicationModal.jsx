import React, { useState, useEffect } from "react";
import { MdClose, MdSend } from "react-icons/md";
import { toast } from "sonner";
import applicationService from "../../services/applicationService";

const ApplicationModal = ({ isOpen, onClose, internship, onSuccess }) => {
  const [step, setStep] = useState(1); // 1: details, 2: success
  const [formData, setFormData] = useState({
    coverLetter: "",
    resumeUrl: "",
    additionalNotes: "",
  });
  const [loading, setLoading] = useState(false);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setFormData({
        coverLetter: "",
        resumeUrl: "",
        additionalNotes: "",
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Show loading toast
    const toastId = toast.loading("Submitting your application...");

    try {
      const response = await applicationService.apply(internship.id, {
        cover_letter: formData.coverLetter,
        resume_url: formData.resumeUrl,
        additional_docs: formData.additionalNotes ? { notes: formData.additionalNotes } : null
      });

      if (response.error) {
        // Handle backend validation errors
        if (response.error.errors) {
          // Multiple validation errors
          response.error.errors.forEach(err => {
            toast.error(err, {
              id: toastId,
              duration: 4000,
            });
          });
        } else if (response.error.message) {
          // Single error message
          toast.error(response.error.message, {
            id: toastId,
            duration: 4000,
          });
        } else {
          // Generic error
          toast.error("Failed to submit application", {
            id: toastId,
            description: "Please check your information and try again",
            duration: 4000,
          });
        }
      } else {
        // Success - update toast to success
        toast.success("Application Submitted!", {
          id: toastId,
          description: `You've successfully applied to ${internship.title}`,
          duration: 5000,
          icon: "🎉",
        });
        
        // Move to success step
        setStep(2);
        if (onSuccess) onSuccess(response.data);
      }
    } catch (err) {
      // Unexpected error
      toast.error("An unexpected error occurred", {
        id: toastId,
        description: "Please try again later",
        duration: 4000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    // Show warning if form is partially filled and user tries to close
    if (step === 1 && (formData.coverLetter || formData.resumeUrl || formData.additionalNotes)) {
      toast.warning("Application not submitted", {
        description: "Your application form data has been cleared",
        duration: 3000,
        icon: "⚠️",
      });
    }
    
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              {step === 1 ? "Apply for Internship" : "Application Submitted!"}
            </h2>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <MdClose size={24} />
            </button>
          </div>

          {/* Body */}
          <div className="p-6">
            {step === 1 ? (
              <>
                {/* Internship Details Summary */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <h3 className="font-semibold text-gray-900 mb-2">{internship?.title}</h3>
                  <p className="text-sm text-gray-600 mb-1">{internship?.company_name}</p>
                  <p className="text-sm text-gray-600">{internship?.location}</p>
                </div>

                {/* Application Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Cover Letter <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="coverLetter"
                      value={formData.coverLetter}
                      onChange={handleInputChange}
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                      placeholder="Tell us why you're interested in this internship and why you'd be a great fit... (minimum 20 characters)"
                      required
                      minLength={20}
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Minimum 20 characters
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Resume URL (Google Drive, Dropbox, etc.)
                    </label>
                    <input
                      type="url"
                      name="resumeUrl"
                      value={formData.resumeUrl}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                      placeholder="https://drive.google.com/..."
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Provide a link to your resume (optional)
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Additional Notes
                    </label>
                    <textarea
                      name="additionalNotes"
                      value={formData.additionalNotes}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                      placeholder="Any additional information you'd like to share..."
                    />
                  </div>

                  {/* Form Actions */}
                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={handleClose}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <>Submitting...</>
                      ) : (
                        <>
                          <MdSend size={18} />
                          Submit Application
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </>
            ) : (
              // Success Step
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Application Received!
                </h3>
                
                <p className="text-gray-600 mb-6">
                  Thank you for applying to <span className="font-medium">{internship?.title}</span>. 
                  Your application has been successfully submitted to the company.
                </p>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-left">
                  <p className="text-sm text-blue-800">
                    <strong>What happens next?</strong>
                    <br />
                    • The company will review your application
                    <br />
                    • You'll receive an email notification when your status changes
                    <br />
                    • You can track your application status in your dashboard
                  </p>
                </div>

                <button
                  onClick={handleClose}
                  className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationModal;