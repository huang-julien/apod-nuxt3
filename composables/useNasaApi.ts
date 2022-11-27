import type { Ref } from 'vue'
import { unref } from 'vue'

/**
 * composable provide all request to call the Nasa API
 */
export default function useNasaApi () {
  const runtimeEnv = useRuntimeConfig()

  async function getApod (query: PartialBy<ApodQuery, 'api_key'>|Ref<PartialBy<ApodQuery, 'api_key'>> = {}) {
    return await $fetch<ApodResponse>('https://api.nasa.gov/planetary/apod', {
      query: {
        api_key: runtimeEnv.NASA_API_KEY,
        ...unref(query)
      }
    })
  }

  return {
    getApod
  }
}
