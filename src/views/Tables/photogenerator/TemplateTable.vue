<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div class="space-y-5 sm:space-y-6">
      <ComponentCard title="Шаблоны">
        <template #action>
          <AddTemplatePhotoGeneratorButton />
        </template>
        <BasicTableTwo />
      </ComponentCard>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref } from "vue";
import AddTemplatePhotoGeneratorButton from "@/components/common/AddTemplatePhotoGeneratorButton.vue";
import PageBreadcrumb from "@/components/common/PageBreadcrumb.vue";
import AdminLayout from "@/components/layout/AdminLayout.vue";
import ComponentCard from "@/components/common/ComponentCard.vue";
import BasicTableTwo from "@/components/tables/photogenerator/templates/BasicTableTwo.vue";
const currentPageTitle = ref("Шаблоны для генерации Photo Generator");
</script>
