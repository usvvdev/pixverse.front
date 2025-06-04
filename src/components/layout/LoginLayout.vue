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
    router.push('/templates')
  } catch (e) {
    alert('Неверный логин или пароль')
  }
}

onMounted(() => {
  if (auth.isAuthenticated) {
    router.replace('/templates')
  }
})
</script>

<template>
  <div class="container flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
    <h2 class="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">Вход</h2>
    <form @submit.prevent="login">
      <div class="mb-3">
        <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Username</label>
        <input type="username" v-model="username" class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800" required />
      </div>
      <div class="mb-3">
        <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Password</label>
        <input type="password" v-model="password" class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800" required />
      </div>
      <button class="w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600" type="submit">Войти</button>
    </form>
  </div>
</template>

<style>
.container {
    height: 100vh;
    justify-content: center;
}

</style>
