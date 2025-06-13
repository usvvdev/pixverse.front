<template>
  <div class="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
    <div class="max-w-full overflow-x-auto custom-scrollbar">
      <table class="min-w-full">
        <thead>
          <tr class="border-b border-gray-200 dark:border-gray-700">
            <th class="px-5 py-3 text-left w-3/11 sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">ID</p>
            </th>
            <th class="px-5 py-3 text-left w-3/11 sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">App Bundle ID</p>
            </th>
            <th class="px-5 py-3 text-left w-1/11 sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Actions</p>
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
          <tr
            v-for="item in styles"
            :key="item.id"
            class="border-t border-gray-100 dark:border-gray-800"
          >
            <td class="px-5 py-4 sm:px-6 text-theme-sm">
              <span class="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                {{ item.id }}
              </span>
            </td>
            <td class="px-5 py-4 sm:px-6 text-theme-sm text-gray-600 dark:text-gray-400">
              {{ item.app_id }}
            </td>
            <td class="px-5 py-4 sm:px-6">
              <div class="flex items-center space-x-2">
                <button
                  @click="openEditModal(item)"
                  class="p-1 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </button>
                <button
                  @click="confirmDelete(item.id)"
                  class="p-1 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
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
  <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
    <div class="fixed inset-0 transition-opacity" aria-hidden="true" @click="closeEditModal">
      <div class="absolute inset-0 bg-gray-500 opacity-75 dark:bg-gray-900 dark:opacity-75"></div>
    </div>
    <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
    <div
      class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full dark:bg-gray-800"
    >
      <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 dark:bg-gray-800">
        <h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-white mb-4">Изменить связку шаблонов и стилей</h3>
        <div class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">App ID</label>
            <input
              v-model="editForm.app_id"
              type="text"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
            />
          </div>

          <!-- Templates Selection -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Шаблоны</label>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-44 overflow-y-auto p-2">
              <div
                v-for="template in availableTemplates"
                :key="template.id"
                @click="toggleTemplateSelection(template.id)"
                class="border rounded-lg p-3 cursor-pointer transition-all"
                :class="{
                  'border-blue-500 bg-blue-50 dark:bg-blue-900/30': selectedTemplateIds.includes(template.id),
                  'border-gray-200 dark:border-gray-600': !selectedTemplateIds.includes(template.id)
                }"
              >
                <div class="flex items-start space-x-3">
                  <video
                    :src="template.preview_small"
                    class="h-12 w-12 rounded flex-shrink-0 object-cover"
                    muted
                    loop
                    autoplay
                  ></video>
                  <div>
                    <h4 class="text-sm font-medium text-gray-900 dark:text-white">{{ template.name }}</h4>
                    <p class="text-xs text-gray-500 dark:text-gray-400">{{ template.category }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Styles Selection -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Стили</label>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-44 overflow-y-auto p-2">
              <div
                v-for="style in availableStyles"
                :key="style.id"
                @click="toggleStyleSelection(style.id)"
                class="border rounded-lg p-3 cursor-pointer transition-all"
                :class="{
                  'border-blue-500 bg-blue-50 dark:bg-blue-900/30': selectedStyleIds.includes(style.id),
                  'border-gray-200 dark:border-gray-600': !selectedStyleIds.includes(style.id)
                }"
              >
                <div class="flex items-start space-x-3">
                  <video
                    :src="style.preview_small"
                    class="h-12 w-12 rounded flex-shrink-0 object-cover"
                    muted
                    loop
                    autoplay
                  ></video>
                  <div>
                    <h4 class="text-sm font-medium text-gray-900 dark:text-white">{{ style.name }}</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-6 flex justify-end space-x-3">
          <button
            type="button"
            @click="closeEditModal"
            class="inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600"
          >
            Отменить
          </button>
          <button
            type="button"
            @click="updateStyle"
            class="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
          >
            Сохранить
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

  <!-- Delete Confirmation Modal -->
  <div v-if="showDeleteModal" class="fixed inset-0 z-50 overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 transition-opacity" aria-hidden="true" @click="closeDeleteModal">
        <div class="absolute inset-0 bg-gray-500 opacity-75 dark:bg-gray-900 dark:opacity-75"></div>
      </div>
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
      <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full dark:bg-gray-800">
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 dark:bg-gray-800">
          <div class="sm:flex sm:items-start">
            <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
              <svg class="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-white">Удалить приложение</h3>
              <div class="mt-2">
                <p class="text-sm text-gray-500 dark:text-gray-400">Вы уверены, что хотите удалить приложение? Это действие будет невозвратно.</p>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse dark:bg-gray-800">
          <button
            type="button"
            @click="deleteApplication"
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
  app_id: '',
  template_ids: [],
  style_ids: []
})
const previewImage = ref(null)
const newImage = ref(null)
const isUpdating = ref(false)
const isDeleting = ref(false)

// Новые данные для выбора шаблонов и стилей
const availableTemplates = ref([])
const availableStyles = ref([])
const selectedTemplateIds = ref([])
const selectedStyleIds = ref([])

const userStore = useAuthStore()

const fetchStyles = async () => {
  try {
    const response = await fetch('/dashboard/api/v1/applications')
    if (!response.ok) {
      throw new Error('Failed to fetch applications')
    }
    styles.value = await response.json()
  } catch (error) {
    console.error('Error fetching applications:', error)
  }
}

// Загрузка доступных шаблонов
const fetchTemplates = async () => {
  try {
    const response = await fetch('/dashboard/api/v1/templates')
    if (!response.ok) {
      throw new Error('Failed to fetch templates')
    }
    availableTemplates.value = await response.json()
  } catch (error) {
    console.error('Error fetching templates:', error)
  }
}

// Загрузка доступных стилей
const fetchStylesList = async () => {
  try {
    const response = await fetch('/dashboard/api/v1/styles')
    if (!response.ok) {
      throw new Error('Failed to fetch styles')
    }
    availableStyles.value = await response.json()
  } catch (error) {
    console.error('Error fetching styles:', error)
  }
}

const openEditModal = (application) => {
  editForm.value = {
    id: application.id,
    app_id: application.app_id,
    template_ids: application.templates ? application.templates.map(t => t.id) : [],
    style_ids: application.styles ? application.styles.map(s => s.id) : []
  }

  // Устанавливаем выбранные ID
  selectedTemplateIds.value = [...editForm.value.template_ids]
  selectedStyleIds.value = [...editForm.value.style_ids]

  showEditModal.value = true
}

const closeEditModal = () => {
  showEditModal.value = false
  selectedTemplateIds.value = []
  selectedStyleIds.value = []
}

const toggleTemplateSelection = (id) => {
  const index = selectedTemplateIds.value.indexOf(id)
  if (index === -1) {
    selectedTemplateIds.value.push(id)
  } else {
    selectedTemplateIds.value.splice(index, 1)
  }
}

const toggleStyleSelection = (id) => {
  const index = selectedStyleIds.value.indexOf(id)
  if (index === -1) {
    selectedStyleIds.value.push(id)
  } else {
    selectedStyleIds.value.splice(index, 1)
  }
}

const updateStyle = async () => {
  isUpdating.value = true
  try {
    const token = localStorage.getItem('accessToken')
    const payload = {
      app_id: editForm.value.app_id,
      template_ids: selectedTemplateIds.value,
      style_ids: selectedStyleIds.value
    }

    const response = await fetch(`/dashboard/api/v1/applications/${editForm.value.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    })

    if (!response.ok) {
      if (response.status === 401) {
        // Токен истёк — пробуем обновить
        const refreshed = await userStore.refresh()

        if (refreshed) {
          // Повторяем оригинальный запрос
          return await updateStyle(true)
        } else {
          // Обновление не удалось — разлогиниваем
          userStore.logout()
          router.push('/')
          return
        }
      } else {
        // Обработка других ошибок
        const errorData = await response.json()
        console.error('Ошибка запроса:', errorData)
        throw new Error(errorData.message || 'Failed to update application')
      }
    }

    const updatedApplication = await response.json()

    // Обновляем локальные данные
    const index = styles.value.findIndex(a => a.id === editForm.value.id)
    if (index !== -1) {
      styles.value[index] = updatedApplication
    }

    closeEditModal()
    await fetchStyles()
  } catch (error) {
    console.error('Error updating application:', error)
    // Здесь можно добавить отображение ошибки пользователю
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

const deleteApplication = async () => {
  isDeleting.value = true
  try {
    const token = localStorage.getItem('accessToken')
    const response = await fetch(`/dashboard/api/v1/applications/${styleToDelete.value}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    if (!response.ok) {
      if (response.status === 401) {
        // Токен истёк — пробуем обновить
        const refreshed = await userStore.refresh()

        if (refreshed) {
          // Повторяем оригинальный запрос
          return await deleteApplication()
        } else {
          // Обновление не удалось — разлогиниваем
          userStore.logout()
          router.push('/')
          return
        }
      } else {
        // Обработка других ошибок
        console.error('Ошибка запроса:', await response.json())
        throw new Error('Failed to delete application')
      }
    }

    // Удаляем приложение из локальных данных
    styles.value = styles.value.filter(a => a.id !== styleToDelete.value)
    closeDeleteModal()
    await fetchStyles()
  } catch (error) {
    console.error('Error deleting application:', error)
    // Здесь можно добавить отображение ошибки пользователю
  } finally {
    isDeleting.value = false
  }
}

onMounted(() => {
  fetchStyles()
  fetchTemplates()
  fetchStylesList()
})
</script>
