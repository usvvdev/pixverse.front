<script setup lang="ts">
import { ref, defineProps, defineEmits, onMounted, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import ButtonComponent from '@/components/button/ui/ButtonComponent.vue'
import { DeleteIcon, EditIcon } from '@/app/assets/icons'

interface TableRowType {
  [key: string]: string
}

const props = defineProps<{
  row: TableRowType
  headers: string[]
}>()

const emit = defineEmits<{
  (e: 'edit', row: TableRowType): void
  (e: 'delete', row: TableRowType): void
}>()

const actions = [
  { id: 1, icon: EditIcon, handler: () => emit('edit', props.row) },
  { id: 2, icon: DeleteIcon, handler: () => emit('delete', props.row) },
]

function getSafeId(url: string) {
  return `${btoa(url)}`
}

const route = useRoute()
const title = route.params.title

const mediaCache = ref<{ [key: string]: string }>({})
const loadedMediaSet = new Set<string>()

async function loadMedia(url: string) {
  if (mediaCache.value[url]) return mediaCache.value[url]

  try {
    // Используем относительный путь через прокси
    const path = url.replace(
      `https://trust.coreapis.space/${title}`,
      `/${title}`,
    )

    const res = await fetch(path)
    if (!res.ok) throw new Error(`Ошибка загрузки: ${res.status}`)

    const blob = await res.blob()
    const reader = new FileReader()

    return new Promise<string>((resolve) => {
      reader.onloadend = () => {
        const base64data = reader.result as string
        mediaCache.value[url] = base64data
        resolve(base64data)
      }
      reader.readAsDataURL(blob)
    })
  } catch (err) {
    console.error('Не удалось загрузить медиа:', url, err)
    return ''
  }
}

async function observeMedia(
  el: HTMLMediaElement | HTMLImageElement,
  url: string,
) {
  if (!el || loadedMediaSet.has(url)) return

  const observer = new IntersectionObserver(
    async (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          if (!el.src) {
            const src = await loadMedia(url)
            if (src) el.src = src
            loadedMediaSet.add(url)
          }
          observer.disconnect()
        }
      }
    },
    { threshold: 0.1 },
  )

  observer.observe(el)
}
onMounted(() => {
  nextTick(() => {
    props.headers.forEach((header) => {
      if (header === 'preview_large' && props.row[header]) {
        const url = props.row[header]
        const el = document.getElementById(getSafeId(url)) as
          | HTMLMediaElement
          | HTMLImageElement
        if (el) {
          if (mediaCache.value[url]) {
            el.src = mediaCache.value[url]
          } else {
            observeMedia(el, url)
          }
        }
      }
    })
  })
})
</script>

<template>
  <tr class="table__row table__row--body">
    <td
      v-for="header in headers"
      :key="header"
      class="table__cell table__cell--body"
    >
      <template v-if="header === 'is_active'">
        <span
          class="table__cell-status"
          :class="{
            'table__cell-status--active': row[header],
            'table__cell-status--inactive': !row[header],
          }"
        >
          {{ row[header] ? 'active' : 'inactive' }}
        </span>
      </template>

      <template v-else-if="header === 'preview_large'">
        <div class="table__preview-wrapper">
          <template v-if="row[header]?.endsWith('.mp4')">
            <video
              class="table__preview"
              :id="getSafeId(row[header])"
              controls
              preload="metadata"
            />
          </template>
          <template v-else>
            <img
              class="table__preview"
              :id="getSafeId(row[header])"
              alt="preview"
            />
          </template>
        </div>
      </template>

      <template v-else>
        <p class="table__cell-text">{{ row[header] }}</p>
      </template>
    </td>

    <td class="table__cell table__cell--actions">
      <ButtonComponent
        v-for="action in actions"
        :icon="action.icon"
        :key="action.id"
        type="button"
        @click="action.handler"
      />
    </td>
  </tr>
</template>

<style lang="scss">
@use './style' as *;
</style>
