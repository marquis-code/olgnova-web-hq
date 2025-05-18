import { ref, reactive } from 'vue'
import { enquires_api } from '@/api_factory/modules/enquires'
import { useCustomToast } from '@/composables/core/useCustomToast'
const { showToast } = useCustomToast();

export function useGeneralEnquiry() {
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const success = ref(false)
  const successMessage = ref('')

  // Make payload reactive and editable from the consuming component
  const payload = ref({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  })

  /**
   * Submit a general enquiry using the internal reactive payload
   */
  const submitEnquiry = async () => {
    isLoading.value = true
    error.value = null
    success.value = false
    successMessage.value = ''

    try {
      const response = await enquires_api.$_general_enquiry(payload.value)
      success.value = true
      successMessage.value = response.data.successMessage || 'Enquiry submitted successfully!'
      showToast({
        title: "Success",
        message: response.data.successMessage || 'Enquiry submitted successfully!',
        toastType: "success",
        duration: 3000
      });
      return response.data
    } catch (err: any) {
      error.value = err.response?.data?.error || 'Failed to submit enquiry. Please try again.',
      showToast({
        title: "Error",
        message: err.response?.data?.error || 'Failed to submit enquiry. Please try again.',
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

    // Reset payload fields
    payload.firstName = ''
    payload.lastName = ''
    payload.email = ''
    payload.phone = ''
    payload.message = ''
  }

  return {
    isLoading,
    error,
    success,
    successMessage,
    payload,
    submitEnquiry,
    resetState
  }
}
