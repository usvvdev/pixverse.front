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
        Добавить новый стиль
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
          <h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-white mb-4">Добавить новый стиль</h3>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
              <input v-model="createForm.name" type="text" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Prompt</label>
              <input v-model="createForm.prompt" type="text" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Preview Small</label>
              <input type="file" accept="video/*" @change="onVideoUpload($event, 'small')" class="mt-1 block w-full text-sm text-gray-500 dark:text-gray-300">
              <video v-if="previewUrls.small" :src="previewUrls.small" controls class="mt-2 max-w-full rounded" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Preview Large</label>
              <input type="file" accept="video/*" @change="onVideoUpload($event, 'large')" class="mt-1 block w-full text-sm text-gray-500 dark:text-gray-300">
              <video v-if="previewUrls.large" :src="previewUrls.large" controls class="mt-2 max-w-full rounded" />
            </div>
          </div>
        </div>
        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse dark:bg-gray-800">
          <button type="button" @click="createStyle" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
            Создать
          </button>
          <button type="button" @click="closeCreateModal" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600">
            Отменить
          </button>
        </div>
      </div>
    </div>
  </div>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const userStore = useAuthStore()

const router = useRouter()

const styles = ref([])
const showCreateModal = ref(false)

const createForm = ref({
  name: '',
  prompt: '',
  previewSmallFile: null,
  previewLargeFile: null
})

const previewUrls = ref({
  small: '',
  large: ''
})

const openCreateModal = () => {
  createForm.value = {
    name: '',
    prompt: '',
    previewSmallFile: null,
    previewLargeFile: null
  }
  showCreateModal.value = true
}

const closeCreateModal = () => {
  showCreateModal.value = false

  // Очистить форму и revoke URL
  createForm.value = {
    name: '',
    prompt: '',
    previewSmallFile: null,
    previewLargeFile: null,
  }

  if (previewUrls.value.small) URL.revokeObjectURL(previewUrls.value.small)
  if (previewUrls.value.large) URL.revokeObjectURL(previewUrls.value.large)

  previewUrls.value = {
    small: '',
    large: '',
  }
}


const onVideoUpload = (event, size) => {
  const file = event.target.files?.[0]
  if (!file) return

  const url = URL.createObjectURL(file)

  if (size === 'small') {
    createForm.value.previewSmallFile = file
    previewUrls.value.small = url
  } else {
    createForm.value.previewLargeFile = file
    previewUrls.value.large = url
  }
}



const createStyle = async () => {
  try {
    const token = localStorage.getItem('accessToken')

    // Формируем query-параметры
    const query = new URLSearchParams({
      name: createForm.value.name,
      prompt: createForm.value.prompt,
    }).toString()

    // Формируем тело с файлами
    const formData = new FormData()

    if (createForm.value.previewSmallFile) {
      formData.append('preview_small', createForm.value.previewSmallFile)
    }

    if (createForm.value.previewLargeFile) {
      formData.append('preview_large', createForm.value.previewLargeFile)
    }

    const response = await fetch(`/dashboard/api/v1/styles?${query}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        // Content-Type НЕ ставим, fetch сам выставит нужный для multipart/form-data
      },
      body: formData,
    })

    if (!response.ok) {
      if (response.status === 401) {
        const refreshed = await userStore.refresh()
        if (refreshed) {
          return await retryOriginalRequest()
        } else {
          userStore.logout()
          router.push('/')
        }
      } else {
        const err = await response.json()
        console.error('Ошибка запроса:', err)
      }
    }

    const newStyle = await response.json()
    styles.value.push(newStyle)
    closeCreateModal()
  } catch (error) {
    console.error('Error creating style:', error)
  }
}



</script>
