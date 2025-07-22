<template>
  <div>
    <!-- Фильтры -->
    <div class="mb-4 flex flex-wrap gap-4 items-center">
      <select
        v-model="selectedUserId"
        class="px-3 py-2 border rounded-md text-sm w-48 dark:bg-gray-900 dark:text-white"
      >
        <option value="">All Users</option>
        <option v-for="id in userIds" :key="id" :value="id">{{ id }}</option>
      </select>

      <select
        v-model="selectedAppId"
        class="px-3 py-2 border rounded-md text-sm w-48 dark:bg-gray-900 dark:text-white"
      >
        <option value="">All Apps</option>
        <option v-for="id in appIds" :key="id" :value="id">{{ id }}</option>
      </select>

      <button
        @click="fetchStatistics"
        class="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
      >
        Apply Filters
      </button>
    </div>

    <!-- Таблица -->
    <div class="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
      <div class="max-w-full overflow-x-auto custom-scrollbar">
        <table class="min-w-full">
          <thead>
            <tr class="border-b border-gray-200 dark:border-gray-700">
              <th class="px-5 py-3 text-left w-2/12 sm:px-6">
                <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">User ID</p>
              </th>
              <th class="px-5 py-3 text-left w-2/12 sm:px-6">
                <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">App ID</p>
              </th>
              <th class="px-5 py-3 text-left w-1/12 sm:px-6">
                <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Usage</p>
              </th>
              <th class="px-5 py-3 text-left w-1/12 sm:px-6">
                <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Balance</p>
              </th>
              <th class="px-5 py-3 text-left w-3/12 sm:px-6">
                <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Generations</p>
              </th>
              <th class="px-5 py-3 text-left w-3/12 sm:px-6">
                <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Accounts</p>
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
            <tr
              v-for="(user, index) in users"
              :key="index"
              class="border-t border-gray-100 dark:border-gray-800"
            >
              <td class="px-5 py-4 sm:px-6 text-theme-sm">
                <span class="block font-medium text-gray-800 dark:text-white/90">{{ user.user_id }}</span>
              </td>
              <td class="px-5 py-4 sm:px-6 text-theme-sm text-gray-600 dark:text-gray-400">
                {{ user.app_id }}
              </td>
              <td class="px-5 py-4 sm:px-6 text-theme-sm text-gray-600 dark:text-gray-400">
                {{ user.app_id_usage }}
              </td>
              <td class="px-5 py-4 sm:px-6 text-theme-sm text-gray-600 dark:text-gray-400">
                {{ user.balance }}
              </td>
              <td class="px-5 py-4 sm:px-6 text-theme-sm text-gray-600 dark:text-gray-400">
                <ul class="list-disc list-inside text-xs space-y-1">
                  <li
                    v-for="id in user.generation_ids.slice(0, 3)"
                    :key="id"
                  >
                    {{ id }}
                  </li>
                  <li v-if="user.generation_ids.length > 3" class="italic text-gray-400">
                    +{{ user.generation_ids.length - 3 }} ещё
                  </li>
                </ul>
              </td>
              <td class="px-5 py-4 sm:px-6 text-theme-sm text-gray-600 dark:text-gray-400">
                <ul class="list-disc list-inside text-xs space-y-1">
                  <li v-for="account in user.accounts" :key="account.id">
                    {{ account.username }}
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>



<script setup lang="ts">
import { ref, onMounted } from 'vue'

const users = ref([])

const selectedUserId = ref('')
const selectedAppId = ref('')

const userIds = ref<string[]>([])
const appIds = ref<string[]>([])

const fetchStatistics = async () => {
  const token = localStorage.getItem('accessToken')
  try {
    const params = new URLSearchParams()
    if (selectedUserId.value) params.append('user_id', selectedUserId.value)
    if (selectedAppId.value) params.append('app_id', selectedAppId.value)

    const response = await fetch(`/dashboard/api/v1/statistics?app_name=pixverse&${params.toString()}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
    if (!response.ok) throw new Error('Failed to fetch statistics')

    users.value = await response.json()
  } catch (error) {
    console.error('Error fetching statistics:', error)
  }
}

const fetchFilters = async () => {
  const token = localStorage.getItem('accessToken')
  try {
    const res = await fetch('/dashboard/api/v1/statistics/filters?app_name=pixverse', {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
    if (!res.ok) throw new Error('Failed to fetch filters')

    const data = await res.json()
    userIds.value = data.user_ids ?? []
    appIds.value = data.app_ids ?? []
  } catch (error) {
    console.error('Error fetching filter options:', error)
  }
}

onMounted(async () => {
  await fetchFilters()
  await fetchStatistics()
})
</script>
