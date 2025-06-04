<template>
  <div
    :class="[
      'rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]',
      className,
    ]"
  >
    <!-- Card Header -->
    <div class="px-6 py-5 flex items-center justify-between">
      <div class="flex items-center">
        <h3 class="text-base font-medium text-gray-800 dark:text-white/90">
          {{ title }}
        </h3>
      </div>
      <slot name="action"/>
      <p v-if="desc" class="mt-1 text-sm text-gray-500 dark:text-gray-400 absolute top-full left-6 w-full">
        {{ desc }}
      </p>
    </div>

    <!-- Card Body -->
    <div class="p-4 border-t border-gray-100 dark:border-gray-800 sm:p-6">
      <div class="space-y-5">
        <slot/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import CommonButton from './CommonButton.vue'

interface Props {
  title: string
  className?: string
  desc?: string
}

defineProps<Props>()
</script>
