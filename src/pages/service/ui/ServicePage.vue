<script setup lang="ts">
import MainLayout from '@/app/layouts/main/ui/MainLayout.vue'
import CardComponent from '@/components/card/ui/CardComponent.vue'
import MenuSidebarWidget from '@/widgets/menu/ui/MenuSidebarWidget.vue'

import { UserController } from '@/services/api/controllers/user/controller'
import { useController } from '@/services/composables/apiRetry'

const token = localStorage.getItem('access_token')
const tokenType = localStorage.getItem('token_type')

const controller = new UserController({
  headers: {
    Authorization: `${tokenType} ${token}`,
  },
})

const services = useController(
  controller,
  (c) => c.services.get().then((res) => res.items),
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
          :key="service.id"
          :isDocs="true"
          tag="docs"
          :title="service.title"
          :href="`/admin/${service.title}`"
        />
      </div>
    </template>
  </MainLayout>
</template>

<style lang="scss">
@use './style' as *;
</style>
