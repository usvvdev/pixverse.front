<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import TableRowComponent from './TableRowComponent.vue'

interface TableRowType {
  [key: string]: string
}

defineProps<{
  data: TableRowType[]
  headers: string[]
}>()

const emit = defineEmits<{
  (e: 'edit', row: TableRowType): void
  (e: 'delete', row: TableRowType): void
}>()
</script>

<template>
  <tbody class="table__content">
    <TableRowComponent
      v-for="(row, rowIndex) in data"
      :key="rowIndex"
      :row="row"
      :headers="headers"
      @edit="emit('edit', $event)"
      @delete="emit('delete', $event)"
    />
  </tbody>
</template>

<style lang="scss">
@use './style' as *;
</style>
