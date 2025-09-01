<script setup lang="ts">
import { computed, defineProps } from 'vue'
import { TableBodyComponent, TableHeadComponent } from '@/components/table'

interface TableRow {
  [key: string]: string
}

const props = defineProps<{
  data: TableRow[]
  exclude?: string[]
}>()

const headers = computed(() => {
  if (!props.data || props.data.length === 0) return []
  return Object.keys(props.data[0]).filter(
    (key) => !props.exclude?.includes(key),
  )
})
</script>

<template>
  <div class="table">
    <div v-if="!data || data.length === 0" class="table__no-data">
      Missing data
    </div>
    <div v-else class="table__wrapper">
      <table class="table__body">
        <TableHeadComponent :headers="headers" />
      </table>

      <div class="table__scroll">
        <table class="table__body">
          <TableBodyComponent :data="data" :headers="headers" />
        </table>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@use './style' as *;
</style>
