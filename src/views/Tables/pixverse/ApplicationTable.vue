<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div class="space-y-5 sm:space-y-6">
      <ComponentCard title="Приложения">
        <template #action>
          <AddApplicationButton />
        </template>
        <BasicTableFour />
      </ComponentCard>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref } from "vue";
import AddApplicationButton from "@/components/common/AddApplicationButton.vue";
import PageBreadcrumb from "@/components/common/PageBreadcrumb.vue";
import AdminLayout from "@/components/layout/AdminLayout.vue";
import ComponentCard from "@/components/common/ComponentCard.vue";
import BasicTableFour from "@/components/tables/pixverse/applications/BasicTableFour.vue";
const currentPageTitle = ref("Приложения");
</script>
