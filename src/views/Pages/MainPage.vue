<template>
  <div class="min-h-screen bg-white dark:bg-gray-900">
    <nav class="border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
      <div class="max-w-7xl mx-auto px-4 py-4 flex gap-6">
        <RouterLink
          to="/main"
          class="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white"
          active-class="text-blue-600 dark:text-white font-semibold underline underline-offset-4"
        >
          Главная
        </RouterLink>
        <RouterLink
          to="/applications"
          class="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white"
          active-class="text-blue-600 dark:text-white font-semibold underline underline-offset-4"
        >
          Приложения
        </RouterLink>
      </div>
    </nav>

    <!-- Header -->
    <header class="border-b border-gray-100 dark:border-gray-800">
      <div class="max-w-7xl mx-auto px-4 py-6">
        <h1 class="text-xl font-normal text-gray-800 dark:text-gray-200">
          Добро пожаловать в API Services
        </h1>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Выберите сервис для работы
        </p>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-2xl mx-auto px-2 py-4">
      <div class="space-y-6">
        <h2 class="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          Доступные API сервисы
        </h2>

        <!-- Services Grid -->
        <div class="grid grid-cols-2 md:grid-cols-3 gap-5">
          <div
            v-for="service in services"
            :key="service.id"
            class="flex flex-col bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-800 overflow-hidden hover:shadow-xs transition-shadow h-36"
          >
            <div class="p-4 flex-grow">
              <div class="flex items-start justify-between h-full">
                <div class="flex flex-col h-full justify-between">
                  <div>
                    <h3 class="text-base font-medium text-gray-800 dark:text-gray-200">{{ service.name }}</h3>
                    <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">{{ service.description }}</p>
                  </div>
                </div>
              </div>
            </div>

            <button
              @click="navigateToService(service.route)"
              class="w-full px-4 py-2.5 text-sm font-medium text-white transition duration-200 rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
              :disabled="isLoading"
            >
              <span v-if="isLoading">Loading...</span>
              <span v-else>Open Admin Panel</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { RouterLink } from 'vue-router'
import { useAuthStore } from '../../stores/auth'

interface Service {
  id: string;
  name: string;
  description: string;
  route: string;
}

export default defineComponent({
  name: 'AdminServices',
  setup() {
    const router = useRouter();
    const userStore = useAuthStore();
    const isLoading = ref(false);

    const services: Service[] = [
      {
        id: 'pixverse',
        name: 'Pixverse',
        description: 'Service for Pixverse API',
        route: '/pix'
      },
      {
        id: 'photo-generator',
        name: 'Photo Generator',
        description: 'Service for Photo Generator API',
        route: '/photogenerator'
      }
    ];

    const navigateToService = async (route: string) => {
      isLoading.value = true;

      try {
        const refreshed = await userStore.refresh()

        if (!refreshed) {
          userStore.logout();
          router.push('/login');
          return;
        }

        router.push(route);
      } catch (error) {
        console.error('Error navigating to service:', error);
        router.push({ name: 'Error' });
      } finally {
        isLoading.value = false;
      }
    };

    return {
      services,
      isLoading,
      navigateToService
    };
  }
});
</script>
