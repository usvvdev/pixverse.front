<template>
  <div
    class="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]"
  >
    <div class="max-w-full overflow-x-auto custom-scrollbar">
      <table class="min-w-full">
        <thead>
          <tr class="border-b border-gray-200 dark:border-gray-700">
            <th class="px-5 py-3 text-left w-3/11 sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">ID</p>
            </th>
            <th class="px-5 py-3 text-left w-2/11 sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Preview</p>
            </th>
            <th class="px-5 py-3 text-left w-2/11 sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Category</p>
            </th>
            <th class="px-5 py-3 text-left w-2/11 sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Name</p>
            </th>
            <th class="px-5 py-3 text-left w-2/11 sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Prompt</p>
            </th>
            <th class="px-5 py-3 text-left w-2/11 sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Status</p>
            </th>
            <th class="px-5 py-3 text-left w-2/11 sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Actions</p>
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
          <tr
            v-for="(style, index) in styles"
            :key="index"
            class="border-t border-gray-100 dark:border-gray-800"
          >
            <td class="px-5 py-4 sm:px-6">
              <span class="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                {{ style.id }}
              </span>
            </td>
            <td class="px-5 py-4 sm:px-6">
              <video
                v-if="style.preview_small"
                :src="style.preview_small"
                controls=""
                class="max-w-[150px] rounded"
              ></video>
            </td>
            <td class="px-5 py-4 sm:px-6">
              <p class="text-gray-500 text-theme-sm dark:text-gray-400">{{ style.category }}</p>
            </td>
            <td class="px-5 py-4 sm:px-6">
              <p class="text-gray-500 text-theme-sm dark:text-gray-400">{{ style.name }}</p>
            </td>
            <td class="px-5 py-4 sm:px-6 max-w-[200px]">
              <p
                class="text-gray-500 text-theme-sm dark:text-gray-400 truncate whitespace-nowrap overflow-hidden"
              >
                {{ style.prompt }}
              </p>
            </td>
            <td class="px-5 py-4 sm:px-6">
              <span
                :class="[
                  'rounded-full px-2 py-0.5 text-theme-xs font-medium',
                  {
                    'bg-success-50 text-success-700 dark:bg-success-500/15 dark:text-success-500':
                      style.is_active,
                    'bg-error-50 text-error-700 dark:bg-error-500/15 dark:text-error-500':
                      !style.is_active,
                  },
                ]"
              >
                {{ style.is_active ? 'Активный' : 'Инактивный' }}
              </span>
            </td>
            <td class="px-5 py-4 sm:px-6">
              <div class="flex items-center space-x-2">
                <button
                  @click="openEditModal(style)"
                  class="p-1 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
                    />
                  </svg>
                </button>
                <button
                  @click="confirmDelete(style.id)"
                  class="p-1 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- Edit Modal -->
  <div v-if="showEditModal" class="fixed inset-0 z-50 overflow-y-auto">
    <div
      class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <div class="fixed inset-0 transition-opacity" aria-hidden="true" @click="closeEditModal">
        <div class="absolute inset-0 bg-gray-500 opacity-75 dark:bg-gray-900 dark:opacity-75"></div>
      </div>
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true"
        >&#8203;</span
      >
      <div
        class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full dark:bg-gray-800"
      >
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 dark:bg-gray-800">
          <h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-white mb-4">
            Изменить шаблон
          </h3>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
              <input
                v-model="editForm.name"
                type="text"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >Category</label
              >
              <input
                v-model="editForm.category"
                type="text"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >Prompt</label
              >
              <input
                v-model="editForm.prompt"
                type="text"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >Status</label
              >
              <select
                v-model="editForm.is_active"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
              >
                <option :value="true">Активный</option>
                <option :value="false">Инактивный</option>
              </select>
            </div>

            <!-- Video small -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >Preview Small</label
              >
              <div class="mt-1 flex items-center">
                <video
                  v-if="previewUrls.small"
                  :src="previewUrls.small"
                  class="h-20 w-20 rounded mr-4"
                  controls
                ></video>
                <input
                  type="file"
                  accept="video/*"
                  @change="onVideoUpload($event, 'small')"
                  class="mt-1 block w-full text-sm text-gray-500 dark:text-gray-300"
                />
              </div>
            </div>

            <!-- Video large -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >Preview Large</label
              >
              <div class="mt-1 flex items-center">
                <video
                  v-if="previewUrls.large"
                  :src="previewUrls.large"
                  class="h-20 w-20 rounded mr-4"
                  controls
                ></video>
                <input
                  type="file"
                  accept="video/*"
                  @change="onVideoUpload($event, 'large')"
                  class="mt-1 block w-full text-sm text-gray-500 dark:text-gray-300"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse dark:bg-gray-800">
          <button
            type="button"
            @click="updateTemplate"
            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Сохранить
          </button>
          <button
            type="button"
            @click="closeEditModal"
            class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600"
          >
            Отменить
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Delete Confirmation Modal -->
  <div v-if="showDeleteModal" class="fixed inset-0 z-50 overflow-y-auto">
    <div
      class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <div class="fixed inset-0 transition-opacity" aria-hidden="true" @click="closeDeleteModal">
        <div class="absolute inset-0 bg-gray-500 opacity-75 dark:bg-gray-900 dark:opacity-75"></div>
      </div>
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true"
        >&#8203;</span
      >
      <div
        class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full dark:bg-gray-800"
      >
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 dark:bg-gray-800">
          <div class="sm:flex sm:items-start">
            <div
              class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"
            >
              <svg
                class="h-6 w-6 text-red-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                Удалить шаблон
              </h3>
              <div class="mt-2">
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  Вы уверены, что хотите удалить шаблон? Это действие будет невозвратно.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse dark:bg-gray-800">
          <button
            type="button"
            @click="deleteStyle"
            :disabled="isDeleting"
            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="isDeleting">Deleting...</span>
            <span v-else>Удалить</span>
          </button>
          <button
            type="button"
            @click="closeDeleteModal"
            class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600"
          >
            Отменить
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

import { useAuthStore } from '@/stores/auth'

const styles = ref([])
const showEditModal = ref(false)
const showDeleteModal = ref(false)
const styleToDelete = ref(null)

const editForm = ref({
  id: null,
  name: '',
  category: '',
  prompt: '',
  is_active: '',
  previewSmallFile: null,
  previewLargeFile: null,
})

const previewUrls = ref({
  small: '',
  large: '',
})

const isUpdating = ref(false)
const isDeleting = ref(false)

const userStore = useAuthStore()

const fetchStyles = async () => {
  try {
    const response = await fetch('/dashboard/api/v1/templates')
    if (!response.ok) {
      throw new Error('Failed to fetch templates')
    }
    styles.value = await response.json()
  } catch (error) {
    console.error('Error fetching templates:', error)
  }
}

const openEditModal = (style) => {
  editForm.value = {
    id: style.id,
    name: style.name,
    prompt: style.prompt,
    category: style.category,
    is_active: style.is_active,
    previewSmallFile: style.previewSmallFile,
    previewLargeFile: style.previewLargeFile,
  }
  showEditModal.value = true
}

const closeEditModal = () => {
  showEditModal.value = false

  editForm.value = {
    name: '',
    prompt: '',
    category: '',
    is_active: '',
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
    editForm.value.previewSmallFile = file
    previewUrls.value.small = url
  } else {
    editForm.value.previewLargeFile = file
    previewUrls.value.large = url
  }
}

const updateTemplate = async () => {
  isUpdating.value = true
  try {
    const token = localStorage.getItem('accessToken')

    // Формируем query-параметры
    const query = new URLSearchParams({
      name: editForm.value.name,
      prompt: editForm.value.prompt,
      category: editForm.value.category,
      is_active: editForm.value.is_active,
    }).toString()

    // Формируем тело с файлами
    const formData = new FormData()

    if (editForm.value.previewSmallFile) {
      formData.append('preview_small', editForm.value.previewSmallFile)
    }

    if (editForm.value.previewLargeFile) {
      formData.append('preview_large', editForm.value.previewLargeFile)
    }

    const response = await fetch(`/dashboard/api/v1/templates/${editForm.value.id}?${query}`, {
      method: 'PUT',
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
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

    const updatedStyle = await response.json()

    // Update the local data
    const index = styles.value.findIndex((s) => s.id === editForm.value.id)
    if (index !== -1) {
      styles.value[index] = updatedStyle
    }

    closeEditModal()
    await fetchStyles()
  } catch (error) {
    console.error('Error updating style:', error)
  } finally {
    isUpdating.value = false
  }
}

const confirmDelete = (id) => {
  styleToDelete.value = id
  showDeleteModal.value = true
}

const closeDeleteModal = () => {
  showDeleteModal.value = false
  styleToDelete.value = null
}

const deleteStyle = async () => {
  isDeleting.value = true
  try {
    const token = localStorage.getItem('accessToken')
    const response = await fetch(`/dashboard/api/v1/templates/${styleToDelete.value}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
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

    // Remove the style from local data
    styles.value = styles.value.filter((s) => s.id !== styleToDelete.value)
    closeDeleteModal()
    await fetchStyles()
  } catch (error) {
    console.error('Error deleting style:', error)
  } finally {
    isDeleting.value = false
  }
}

onMounted(() => {
  fetchStyles()
})
</script>

<style scoped>
/* Add any additional styles here if needed */
img {
  cursor: pointer;
  transition: transform 0.2s;
}
img:hover {
  transform: scale(1.05);
}
</style>
