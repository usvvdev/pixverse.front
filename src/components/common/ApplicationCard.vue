<script setup lang="ts">
defineProps<{
  application_id: string
  name: string
  description?: string | unknown
}>()
</script>

<template>
  <div class="card">
    <div class="card-header">
      <h2 class="app-name" :title="name">{{ name }}</h2>
    </div>

    <p class="app-description">
      {{ description || 'Описание недоступно' }}
    </p>



    <div class="app-id-section">
      <p class="app-id-label">ID приложения:</p>
      <div class="app-id">{{ application_id }}</div>
    </div>

    <button class="btn-primary btn-manage">Управление</button>
  </div>
</template>

<style scoped>
.card {
  flex: 1 1 calc((100% - 3rem) / 4); /* 4 карточки с учётом трёх gap по 1rem */
  max-width: 330px;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 1rem;
  padding: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.icon {
  font-size: 16px;
  color: #3b82f6;
}

.app-name {
  font-weight: 600;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.badge-testing {
  margin-left: auto;
  font-size: 11px;
  padding: 2px 6px;
  background: #fef3c7;
  color: #b45309;
  border-radius: 9999px;
}

.app-description {
  color: #6b7280;
  font-size: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.apis-title {
  font-weight: 500;
  margin-bottom: 2px;
  font-size: 12px;
}

.apis-list {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.api-badge {
  background: #ede9fe;
  color: #3b82f6;
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 9999px;
}

.no-apis {
  color: #9ca3af;
  font-size: 12px;
}

.app-id-label {
  color: #6b7280;
  font-size: 12px;
  margin-bottom: 2px;
}

.app-id {
  font-family: monospace;
  font-size: 11px;
  background: #f3f4f6;
  color: #374151;
  padding: 4px 6px;
  border-radius: 6px;
  word-break: break-word;
}

.btn-manage {
  margin-top: 8px;
  background: #3b82f6;
  color: white;
  font-size: 12px;
  padding: 6px 10px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s ease-in-out;
}

.btn-manage:hover {
  background: #3b82f6;
}
</style>
