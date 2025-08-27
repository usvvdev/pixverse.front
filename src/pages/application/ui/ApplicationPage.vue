<script setup lang="ts">
import MainLayout from '@/app/layouts/main/ui/MainLayout.vue'
import MenuSidebarWidget from '@/widgets/menu/ui/MenuSidebarWidget.vue'
import CardComponent from '@/components/card/ui/CardComponent.vue'

import { DashboardController } from '@/services/api/controllers/dashboard/controller'
import { useController } from '@/services/composables/apiRetry'

const token = localStorage.getItem('access_token')
const tokenType = localStorage.getItem('token_type')

const controller = new DashboardController({
  headers: {
    Authorization: `${tokenType} ${token}`,
  },
})

const applications = useController(
  controller,
  async () => {
    const response = await controller.applications.get()
    return response
  },
  'applications',
)
</script>

<template>
  <MainLayout>
    <template #sidebar>
      <MenuSidebarWidget />
    </template>

    <template #content>
      <div class="wrapper__applications">
        <CardComponent
          v-for="application in applications"
          class-name="base__card-content"
          :key="application.name"
          :title="application.name"
          tag="application"
          :href="'/'"
        >
          <p class="base__card-content__text">
            {{ application.application_id }}
          </p>
        </CardComponent>
      </div>
    </template>
  </MainLayout>
</template>

<style lang="scss">
@use './style' as *;
</style>
