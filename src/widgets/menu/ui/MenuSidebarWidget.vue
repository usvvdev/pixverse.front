<script setup lang="ts">
import type { Component } from 'vue'

import { useRouter } from 'vue-router'

import ButtonComponent from '@/components/button/ui/ButtonComponent.vue'
import useAuthStore from '@/app/providers/stores'

import { HomeIcon, ApplicationIcon, LogoutIcon } from '@/app/assets/icons'

const authStore = useAuthStore()
const router = useRouter()

interface NavigationItem {
  href?: string
  icon: Component
  onClick?: () => void
}

interface SidebarItem {
  navigation: NavigationItem[]
  logout: NavigationItem[]
}

const logout = async () => {
  await authStore.logout()
  await router.push('/')
}

const sidebarItems: SidebarItem = {
  navigation: [
    { href: '/services', icon: HomeIcon },
    { href: '/applications', icon: ApplicationIcon },
  ],
  logout: [
    {
      icon: LogoutIcon,
      onClick: logout,
    },
  ],
}
</script>

<template>
  <div class="sidebar">
    <div class="sidebar__logo">
      <router-link :to="'/'" class="sidebar__logo-title"> sda </router-link>
    </div>
    <div
      v-for="(items, section) in sidebarItems"
      :key="section"
      :class="`sidebar__${section}`"
    >
      <ButtonComponent
        v-for="item in items"
        :key="item.href"
        :href="item.href"
        :icon="item.icon"
        :onClick="item.onClick"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use './style' as *;
</style>
