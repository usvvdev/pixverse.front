import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import useAuthStore from '@/app/providers/stores'
import { withTokenRetry } from '../api/utils'

export function useController<T>(
  controller: any,
  method: () => Promise<T>,
  cacheKey?: string,
) {
  const data = ref<T | null>(null)
  const router = useRouter()
  const authStore = useAuthStore()

  onMounted(async () => {
    if (cacheKey) {
      const cached = localStorage.getItem(cacheKey)
      if (cached) data.value = JSON.parse(cached)
    }

    try {
      const response = await withTokenRetry(
        controller,
        method,
        authStore,
        router,
      )
      data.value = response
      if (cacheKey) localStorage.setItem(cacheKey, JSON.stringify(response))
    } catch (err) {
      console.error(err)
    }
  })

  return data
}
