import { ref } from '#imports'

/**
 * Composable to return a loading state when calling the callback
 * @param {Function} callback
 */
export default function useWithLoading<Callback extends (...args: any[]) => any | Promise<any>>(callback: Callback) {
  const loading = ref(false)
  const error = ref<any>(null)

  /**
     * trigger the callback
     * @param {Parameters<Callback>} args - argument of the callback
     */
  async function trigger (...args: Parameters<Callback>) {
    loading.value = true
    error.value = null
    try {
      // eslint-disable-next-line n/no-callback-literal
      await callback(...args)
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    trigger,
    error
  }
}
