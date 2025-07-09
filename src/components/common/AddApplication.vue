<!-- components/AddApplication.vue -->
<template>
  <div class="fixed inset-0 bg-black/50 flex justify-center items-start pt-20 z-50">
    <div class="bg-white dark:bg-gray-900 rounded-lg shadow-lg max-w-3xl w-full p-6 overflow-auto max-h-[90vh]">
      <h2 class="text-xl font-semibold text-gray-800 dark:text-white mb-4">{{ isEdit ? 'Редактировать приложение' : 'Добавить приложение' }}</h2>

      <form @submit.prevent="handleSubmit" class="space-y-5">
        <div>
          <label class="label">Название</label>
          <input v-model="form.name" class="input" placeholder="Название приложения" required />
        </div>

        <div>
          <label class="label">ID приложения</label>
          <input v-model="form.application_id" class="input" placeholder="ID приложения" required />
        </div>

        <div>
          <label class="label">Описание приложения</label>
          <input v-model="form.description" class="input" placeholder="Описание приложения" required />
        </div>

        <div>
          <label class="label">Регион размещения</label>
          <input v-model="form.region" class="input" placeholder="Напр. US, EU, RU" />
        </div>

        <div>
          <label class="label">Регион App Store</label>
          <input v-model="form.store_region" class="input" />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="label">Номер</label>
            <input v-model="form.application_number" class="input" />
          </div>
          <div>
            <label class="label">Категория</label>
            <input v-model="form.category" class="input" />
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="label">Дата начала</label>
            <input type="date" v-model="form.start_date" class="input" />
          </div>
          <div>
            <label class="label">Дата релиза</label>
            <input type="date" v-model="form.release_date" class="input" />
          </div>
        </div>

        <div>
          <label class="label">Технология</label>
          <select v-model="form.technology" class="input">
            <option disabled value="">Выберите тип</option>
            <option>Native</option>
            <option>Flutter</option>
            <option>React Native</option>
            <option>Swift</option>
            <option>Python</option>
          </select>
        </div>

        <div class="pt-4 flex justify-between flex-wrap gap-3">
          <div v-if="isEdit">
            <button
              type="button"
              @click="handleDelete"
              class="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
            >
              Удалить
            </button>
          </div>
          <div class="flex gap-3 ml-auto">
            <button
              type="button"
              @click="$emit('close')"
              class="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600"
            >
              Отмена
            </button>
            <button
              type="submit"
              class="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              Сохранить
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch, defineProps, defineEmits } from 'vue'

interface Application {
  id?: string
  name: string
  application_id: string
  description: string
  region?: string
  store_region?: string
  application_number?: string
  category?: string
  start_date?: string
  release_date?: string
  technology?: string
}

const handleDelete = () => {
  if (form.id) {
    emit('delete', form.id)
  }
}

const props = defineProps<{
  modelValue: Application | null
}>()

const emit = defineEmits(['update:modelValue', 'close', 'save', 'delete'])

const form = reactive<Application>({
  id: '',
  application_id: '',
  description: '',
  name: '',
  region: '',
  store_region: '',
  application_number: '',
  category: '',
  start_date: '',
  release_date: '',
  technology: '',
})

const isEdit = !!props.modelValue

// Инициализация формы из props (при редактировании)
watch(
  () => props.modelValue,
  (val) => {
    if (val) {
      Object.assign(form, {
        ...val,
        start_date: val.start_date?.slice(0, 10) ?? '',
        release_date: val.release_date?.slice(0, 10) ?? '',
      })
    } else {
      Object.keys(form).forEach((k) => {
        // @ts-ignore
        form[k] = ''
      })
    }
  },
  { immediate: true },
)

const handleSubmit = () => {
  // отправить данные и закрыть форму
  emit('save', { ...form })
}
</script>

<style scoped>
.label {
  display: block;
  margin-bottom: 0.25rem;
  font-weight: 600;
  color: #374151;
}
.input {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  background-color: white;
  color: #1f2937;
  outline: none;
  font-size: 0.875rem;
  transition: border-color 0.2s;
}
.input:focus {
  border-color: #3b82f6;
}
</style>
