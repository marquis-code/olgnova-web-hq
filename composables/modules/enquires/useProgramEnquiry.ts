import { ref } from 'vue'
import { enquires_api } from '@/api_factory/modules/enquires'

export function useProgramEnquiry() {
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const success = ref(false)
  const successMessage = ref('')

  /**
   * Submit a program/pro bono enquiry
   * @param payload The program enquiry data
   */
  const submitProgramEnquiry = async (payload: {
    organization: string,
    contactName: string,
    contactEmail: string,
    focusArea: string,
    otherFocus: string,
    description: string,
    newsletter?: false
  }) => {
    isLoading.value = true
    error.value = null
    success.value = false
    successMessage.value = ''

    const formattedData = {
      organization_name: payload.organization,
      contact_name: payload.contactName,
      contact_email: payload.contactEmail,
      focus_area: payload.focusArea || payload.otherFocus,
      organization_description: payload.description
    }

    try {
      const response = await enquires_api.$_program_enquiry(formattedData)
      success.value = true
      successMessage.value = response.data.successMessage || 'Program enquiry submitted successfully!'
      showToast({
        title: "Success",
        message: response.data.successMessage || 'Program enquiry submitted successfully!',
        toastType: "success",
        duration: 3000
      });
      return response.data
    } catch (err: any) {
      error.value = err.response?.data?.error || 'Failed to submit program enquiry. Please try again.'
      showToast({
        title: "Error",
        message: err.response?.data?.error || 'Failed to submit program enquiry. Please try again.',
        toastType: "error",
        duration: 3000
      });
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const resetState = () => {
    isLoading.value = false
    error.value = null
    success.value = false
    successMessage.value = ''
  }

  return {
    isLoading,
    error,
    success,
    successMessage,
    submitProgramEnquiry,
    resetState
  }
}