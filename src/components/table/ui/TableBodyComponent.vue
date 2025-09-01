<script setup lang="ts">
import { defineProps } from 'vue'

import TableRowComponent from './TableRowComponent.vue'

interface TableRowType {
  [key: string]: string
}

defineProps<{
  data: TableRowType[]
  headers: string[]
}>()
</script>

<template>
  <tbody class="table__content">
    <TableRowComponent
      v-for="(row, rowIndex) in data"
      :key="rowIndex"
      :row="row"
      :headers="headers"
    />
  </tbody>
</template>

<style lang="scss">
@use './style' as *;
</style>
