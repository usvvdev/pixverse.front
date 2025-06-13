<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import {useAuthStore} from '@/stores/auth'

const auth = useAuthStore()
const router = useRouter()

const username = ref('')
const password = ref('')

const login = async () => {
  try {
    await auth.login(username.value, password.value)
    router.push('/main')
  } catch (e) {
    alert('Неверный логин или пароль')
  }
}

onMounted(() => {
  if (auth.isAuthenticated) {
    router.replace('/main')
  }
})
</script>

<template>
  <div class="container flex flex-col justify-center flex-1 w-full px-4 mx-auto max-w-md">
    <h2 class="mb-4 text-2xl font-semibold text-gray-800 dark:text-white/90 md:mb-6 md:text-3xl">Вход</h2>
    <form @submit.prevent="login" class="w-full">
      <div class="mb-3 md:mb-6">
        <label class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-400 md:text-base">Username</label>
        <input
          type="text"
          v-model="username"
          class="w-full h-12 px-4 py-2 text-base text-gray-800 transition duration-200 bg-transparent border border-gray-300 rounded-lg shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 md:h-14 md:text-lg"
          required
        />
      </div>
      <div class="mb-6 md:mb-8">
        <label class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-400 md:text-base">Password</label>
        <input
          type="password"
          v-model="password"
          class="w-full h-12 px-4 py-2 text-base text-gray-800 transition duration-200 bg-transparent border border-gray-300 rounded-lg shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 md:h-14 md:text-lg"
          required
        />
      </div>
      <button
        class="w-full px-6 py-3 text-base font-medium text-white transition duration-200 rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 md:py-4 md:text-lg"
        type="submit"
      >
        Войти
      </button>
    </form>
  </div>
</template>

<style>
.container {
    height: 100vh;
    justify-content: center;
}

</style>
