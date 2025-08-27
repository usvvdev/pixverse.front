import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import useAuthStore from '@/app/providers/stores';
import { withTokenRetry } from '../api/utils';
export function useController(controller, method, cacheKey) {
    const data = ref(null);
    const router = useRouter();
    const authStore = useAuthStore();
    onMounted(async () => {
        if (cacheKey) {
            const cached = localStorage.getItem(cacheKey);
            if (cached)
                data.value = JSON.parse(cached);
        }
        try {
            const response = await withTokenRetry(controller, method, authStore, router);
            data.value = response;
            if (cacheKey)
                localStorage.setItem(cacheKey, JSON.stringify(response));
        }
        catch (err) {
            console.error(err);
        }
    });
    return data;
}
