<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import Card from '@/components/common/ApplicationCard.vue'
import AddApplication from '@/components/common/AddApplication.vue'

interface Application {
  id: number
  application_id: string
  name: string
  description: string
  region?: string
  store_region?: string
  application_number?: string
  category?: string
  start_date?: string
  release_date?: string
  technology?: string
}

const apps = ref<Application[]>([])
const showModal = ref(false)
const editableApp = ref<Application | null>(null)

const fetchApps = async () => {
  try {
    const token = localStorage.getItem('accessToken')
    const response = await fetch('/dashboard/api/v1/store_applications', {
      headers: { Authorization: `Bearer ${token}` },
    })

    if (!response.ok) throw new Error('Ошибка загрузки приложений')

    const data = await response.json()
    apps.value = data
  } catch (err) {
    console.error('Ошибка при получении приложений:', err)
  }
}

const addApplication = async (app: Application) => {
  const token = localStorage.getItem('accessToken')

  const response = await fetch('/dashboard/api/v1/store_applications', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(app),
  })

  if (!response.ok) throw new Error('Ошибка при создании приложения')

  const newApp = await response.json()
  apps.value.push(newApp)
}

const updateApplication = async (app: Application) => {
  const token = localStorage.getItem('accessToken')

  const response = await fetch(`/dashboard/api/v1/store_applications/${app.id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(app),
  })

  if (!response.ok) throw new Error('Ошибка при обновлении приложения')

  const updated = await response.json()
  const index = apps.value.findIndex((a) => a.id === app.id)
  if (index !== -1) apps.value[index] = updated
}

const handleDelete = async (appId: number) => {
  const token = localStorage.getItem('accessToken')

  const response = await fetch(`/dashboard/api/v1/store_applications/${appId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) throw new Error('Ошибка при удалении приложения')

  apps.value = apps.value.filter((a) => a.id !== appId)

  await fetchApps()
  closeModal()
}

function openAdd() {
  editableApp.value = null
  showModal.value = true
}

function openEdit(app: Application) {
  editableApp.value = { ...app }
  showModal.value = true
}

function closeModal() {
  showModal.value = false
  editableApp.value = null
}

async function saveApplication(app: Application) {
  try {
    if (app.id) {
      await updateApplication(app)
    } else {
      await addApplication(app)
    }
    await fetchApps()
    closeModal()
  } catch (err) {
    console.error('Ошибка сохранения:', err)
  }
}

onMounted(fetchApps)
</script>


<template>
  <div class="min-h-screen bg-white dark:bg-gray-900">
    <!-- Navigation -->
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
      <div
        class="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
      >
        <div>
          <h1 class="text-xl font-normal text-gray-800 dark:text-gray-200">
            Приложения
          </h1>
          <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Управляйте своими приложениями и API-подключениями
          </p>
        </div>

        <button
          @click="openAdd"
          class="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
        >
          + Добавить приложение
        </button>
      </div>
    </header>

    <!-- Main -->
    <main class="max-w-7xl mx-auto px-4 py-6">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <Card
          v-for="app in apps"
          :key="app.id"
          :application_id="app.application_id"
          :name="app.name"
          :description="app.description"
          @click.native.prevent="openEdit(app)"
          class="cursor-pointer"
        />
      </div>
    </main>

    <!-- Modal Add/Edit -->
    <AddApplication
      v-if="showModal"
      :modelValue="editableApp"
      @update:modelValue="val => (editableApp = val)"
      @close="closeModal"
      @save="saveApplication"
      @delete="handleDelete"
    />
  </div>
</template>
