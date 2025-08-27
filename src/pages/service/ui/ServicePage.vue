<script setup lang="ts">
import MainLayout from '@/app/layouts/main/ui/MainLayout.vue'
import CardComponent from '@/components/card/ui/CardComponent.vue'
import MenuSidebarWidget from '@/widgets/menu/ui/MenuSidebarWidget.vue'

import { AuthUserController } from '@/services/api/controllers/auth/controller'
import { useController } from '@/services/composables/apiRetry'

const token = localStorage.getItem('access_token')
const tokenType = localStorage.getItem('token_type')

const controller = new AuthUserController({
  headers: {
    Authorization: `${tokenType} ${token}`,
  },
})

const services = useController(
  controller,
  async () => {
    const response = await controller.services.get()
    return response.items
  },
  'services',
)
</script>

<template>
  <MainLayout>
    <template #sidebar>
      <MenuSidebarWidget />
    </template>

    <template #content>
      <div class="wrapper__services">
        <CardComponent
          v-for="service in services"
          :key="service.title"
          :isDocs="true"
          tag="docs"
          :title="service.title"
          :href="`/dashboard/${service.title}`"
        />
      </div>
    </template>
  </MainLayout>
</template>

<style lang="scss">
@use './style' as *;
</style>
