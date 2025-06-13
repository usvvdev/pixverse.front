<template>
  <div>
    <!-- Add New Account Button -->
    <div class="flex justify-end">
      <button
        @click="openCreateModal"
        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
        </svg>
        Добавить новое приложение
      </button>
    </div>

    <!-- Edit Modal (existing code remains the same) -->

    <!-- Create Modal -->
    <div v-if="showCreateModal" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 transition-opacity" aria-hidden="true" @click="closeCreateModal">
          <div class="absolute inset-0 bg-gray-500 opacity-75 dark:bg-gray-900 dark:opacity-75"></div>
        </div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full dark:bg-gray-800">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 dark:bg-gray-800">
            <h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-white mb-4">Добавить новое приложение</h3>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">App Bundle ID</label>
                <input v-model="createForm.app_id" type="text" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm">
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse dark:bg-gray-800">
            <button type="button" @click="createApplication" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
              Создать
            </button>
            <button type="button" @click="closeCreateModal" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600">
              Отменить
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal (existing code remains the same) -->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const userStore = useAuthStore()

const router = useRouter()

const applications = ref([])
const showEditModal = ref(false)
const showCreateModal = ref(false)
const showDeleteModal = ref(false)
const accountToDelete = ref(null)

const editForm = ref({
  id: null,
  username: '',
  password: '',
  is_active: true,
  balance: 0
})

const createForm = ref({
  app_id: '',
})

const openCreateModal = () => {
  createForm.value = {
    app_id: '',
  }
  showCreateModal.value = true
}

const closeCreateModal = () => {
  showCreateModal.value = false
}

const createApplication = async () => {
  try {
    const token = localStorage.getItem('accessToken')
    const response = await fetch('/chatgpt/api/v1/applications', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(createForm.value)
    })

    if (!response.ok) {
      if (response.status === 401) {
        // Токен истёк — пробуем обновить
        const refreshed = await userStore.refresh()

        if (refreshed) {
          // Повторяем оригинальный запрос (например, через ту же функцию)
          return await retryOriginalRequest()
        } else {
          // Обновление не удалось — разлогиниваем
          userStore.logout()
          router.push('/')
        }
      } else {
        // Обработка других ошибок
        console.error('Ошибка запроса:', await response.json())
      }
    }

    const newApplication = await response.json()
    applications.value.push(newApplication)
    closeCreateModal()
  } catch (error) {
    console.error('Error creating account:', error)
  }
}

</script>

