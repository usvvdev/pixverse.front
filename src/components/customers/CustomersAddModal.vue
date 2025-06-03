<script setup lang="ts">
import { ref, reactive } from 'vue'
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const schema = z.object({
  username: z.string().min(2, 'Too short'),
  password: z.string().min(5, 'Too short')
})
const open = ref(false)

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  username: undefined,
  password: undefined
})

const toast = useToast()
async function onSubmit(event: FormSubmitEvent<Schema>) {
  toast.add({ title: 'Успешно', description: `Аккаунт ${event.data.username} был добавлен`, color: 'success' })
  open.value = false
}
</script>

<template>
  <UModal v-model:open="open" title="Добавить аккаунт" description="Добавьте новый аккаунт в базу данных">
    <UButton label="Добавить аккаунт" icon="i-lucide-plus" />

    <template #body>
      <UForm
        :schema="schema"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormField label="Username" placeholder="John Doe" name="username">
          <UInput v-model="state.username" class="w-full" />
        </UFormField>
        <UFormField label="Password" placeholder="john.doe@example.com" name="password">
          <UInput v-model="state.password" class="w-full" />
        </UFormField>
        <div class="flex justify-end gap-2">
          <UButton
            label="Отмена"
            color="neutral"
            variant="subtle"
            @click="open = false"
          />
          <UButton
            label="Добавить"
            color="primary"
            variant="solid"
            type="submit"
          />
        </div>
      </UForm>
    </template>
  </UModal>
</template>
