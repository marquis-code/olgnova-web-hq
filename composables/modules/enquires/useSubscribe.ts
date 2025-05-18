import { ref } from 'vue'
import { enquires_api } from '@/api_factory/modules/enquires'

export function useSubscribe() {
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const success = ref(false)
  const successMessage = ref('')

  /**
   * Subscribe to email newsletter
   * @param payload The subscription data
   */
  const subscribe = async (payload: {
    email: string
    interests?: string[]
  }) => {
    isLoading.value = true
    error.value = null
    success.value = false
    successMessage.value = ''

    try {
      const response = await enquires_api.$_subscribe(payload)
      success.value = true
      successMessage.value = response.data.successMessage || 'Subscribed successfully!'
      showToast({
        title: "Success",
        message: response.data.successMessage || 'Subscribed successfully!',
        toastType: "success",
        duration: 3000
      });
      return response.data
    } catch (err: any) {
      error.value = err.response?.data?.error || 'Failed to subscribe. Please try again.'
      showToast({
        title: "Error",
        message: err.response?.data?.error || 'Failed to subscribe. Please try again.',
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
    subscribe,
    resetState
  }
}