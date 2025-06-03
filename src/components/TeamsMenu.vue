<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  collapsed?: boolean
}>()

const teams = ref([{
  label: 'Pixverse',
  avatar: {
    alt: 'Pixverse'
  }
}])
const selectedTeam = ref(teams.value[0])
</script>

<template>
  <UButton
    v-bind="{
      ...selectedTeam,
      label: collapsed ? undefined : selectedTeam?.label,
    }"
    color="neutral"
    variant="ghost"
    block
    :square="collapsed"
    class="data-[state=open]:bg-elevated"
    :class="[!collapsed && 'py-2']"
    :ui="{
      trailingIcon: 'text-dimmed'
    }"
  />
</template>
