<script setup lang="ts">
import { useTemplateRef, h, ref, watch, resolveComponent } from 'vue'
import { upperFirst } from 'scule'
import type { TableColumn } from '@nuxt/ui'
import { useFetch } from '@vueuse/core'
import { getPaginationRowModel, type Row } from '@tanstack/table-core'
import type { Template } from '../types'

const UAvatar = resolveComponent('UAvatar')
const UButton = resolveComponent('UButton')
const UBadge = resolveComponent('UBadge')
const UDropdownMenu = resolveComponent('UDropdownMenu')
const UCheckbox = resolveComponent('UCheckbox')

const toast = useToast()
const table = useTemplateRef('table')

const columnFilters = ref([{
  id: 'username',
  value: ''
}])
const columnVisibility = ref()
const rowSelection = ref({ 1: true })
const isDeleting = ref(false)

const { data, isFetching } = useFetch('/dashboard/v1/templates', { initialData: [] }).json<Template[]>()

async function deleteAccount(id: number) {
  isDeleting.value = true
  try {
    const ids = Array.isArray(id) ? id : [id];

    await Promise.all(ids.map(id =>
      useFetch(`/dashboard/v1/account/${id}`, {
        method: 'DELETE'
      })
    ));

    toast.add({
      title: 'Успешно',
      description: `Удалено ${ids.length} аккаунт(ов)`,
      color: 'success'
    })

  } catch (err) {
    toast.add({
      title: 'Ошибка',
      description: 'Не удалось удалить аккаунт',
      color: 'error',
    })
    console.error('Delete error:', err)
  }
  finally {
    isDeleting.value = false
  }
}

function getRowItems(row: Row<Template>) {
  return [
    {
      type: 'label',
      label: 'Действия'
    },
    {
      label: 'Скопировать ID аккаунта',
      icon: 'i-lucide-copy',
      onSelect() {
        navigator.clipboard.writeText(row.original.id.toString())
        toast.add({
          title: 'Copied to clipboard',
          description: 'Customer ID copied to clipboard'
        })
      }
    },
    {
      type: 'separator'
    },
    {
      label: 'Редактировать аккаунт',
      icon: 'i-lucide-list'
    },
    {
      type: 'separator'
    },
    {
      label: 'Удалить аккаунт',
      icon: 'i-lucide-trash',
      color: 'error',
      onSelect() {
        const confirmDelete = confirm(`Удалить аккаунт ${row.original.username}?`)
        if (confirmDelete) {
          deleteAccount(row.original.id)
        }
      }
    }
  ]
}

const columns: TableColumn<Template>[] = [
  {
    id: 'select',
    header: ({ table }) =>
      h(UCheckbox, {
        'modelValue': table.getIsSomePageRowsSelected()
          ? 'indeterminate'
          : table.getIsAllPageRowsSelected(),
        'onUpdate:modelValue': (value: boolean | 'indeterminate') =>
          table.toggleAllPageRowsSelected(!!value),
        'ariaLabel': 'Select all'
      }),
    cell: ({ row }) =>
      h(UCheckbox, {
        'modelValue': row.getIsSelected(),
        'onUpdate:modelValue': (value: boolean | 'indeterminate') => row.toggleSelected(!!value),
        'ariaLabel': 'Select row'
      })
  },
  {
    accessorKey: 'id',
    header: 'ID'
  },
  {
    accessorKey: 'template_id',
    header: 'TemplateID'
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => {
      return h('div', { class: 'flex items-center gap-3' }, [
        h('div', undefined, [
          h('p', { class: 'font-medium text-highlighted' }, row.original.name),
        ])
      ])
    }
  },
  {
    accessorKey: 'category',
    header: 'Category',
    cell: ({ row }) => row.original.category
  },
  {
    accessorKey: 'preview',
    header: 'Preview',
    filterFn: 'equals',
    cell: ({ row }) => {
      const photoUrl = row.original.preview || '/default-avatar.jpg';

    return h('div', { class: 'flex items-center' }, [
      h(UAvatar, {
        src: photoUrl,
        size: 'sm',
        alt: 'Preview',
        class: 'w-30 h-30 rounded-md object-cover'
      }),
    ]);
  }
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return h(
        'div',
        { class: 'text-right' },
        h(
          UDropdownMenu,
          {
            content: {
              align: 'end'
            },
            items: getRowItems(row)
          },
          () =>
            h(UButton, {
              icon: 'i-lucide-ellipsis-vertical',
              color: 'neutral',
              variant: 'ghost',
              class: 'ml-auto'
            })
        )
      )
    }
  }
]

const statusFilter = ref('all')

watch(() => statusFilter.value, (newVal) => {
  if (!table?.value?.tableApi) return

  const statusColumn = table.value.tableApi.getColumn('is_active')
  if (!statusColumn) return

  if (newVal === 'all') {
    statusColumn.setFilterValue(undefined)
  } else {
    statusColumn.setFilterValue(newVal === 'true')
  }
})

const pagination = ref({
  pageIndex: 0,
  pageSize: 10
})
</script>

<template>
  <UDashboardPanel id="templates">
    <template #header>
      <UDashboardNavbar title="Шаблоны">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <template #right>
          <CustomersAddModal />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div class="flex flex-wrap items-center justify-between gap-1.5">
        <UInput
          :model-value="(table?.tableApi?.getColumn('username')?.getFilterValue() as string)"
          class="max-w-sm"
          icon="i-lucide-search"
          placeholder="Поиск аккаунтов..."
          @update:model-value="table?.tableApi?.getColumn('username')?.setFilterValue($event)"
        />

        <div class="flex flex-wrap items-center gap-1.5">
          <USelect
            v-model="statusFilter"
            :items="[
              { label: 'Все', value: 'all' },
              { label: 'Активные', value: 'true' },
              { label: 'Неактивные', value: 'false'},
            ]"
            :ui="{ trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200' }"
            class="min-w-28"
          />
          <UDropdownMenu
            :items="
              table?.tableApi
                ?.getAllColumns()
                .filter((column: any) => column.getCanHide())
                .map((column: any) => ({
                  label: upperFirst(column.id),
                  type: 'checkbox' as const,
                  checked: column.getIsVisible(),
                  onUpdateChecked(checked: boolean) {
                    table?.tableApi?.getColumn(column.id)?.toggleVisibility(!!checked)
                  },
                  onSelect(e?: Event) {
                    e?.preventDefault()
                  }
                }))
            "
            :content="{ align: 'end' }"
          >
            <UButton
              label="Показывать"
              color="neutral"
              variant="outline"
              trailing-icon="i-lucide-settings-2"
            />
          </UDropdownMenu>
        </div>
      </div>

      <UTable
        ref="table"
        v-model:column-filters="columnFilters"
        v-model:column-visibility="columnVisibility"
        v-model:row-selection="rowSelection"
        v-model:pagination="pagination"
        :pagination-options="{
          getPaginationRowModel: getPaginationRowModel()
        }"
        class="shrink-0"
        :data="data ?? []"
        :columns="columns"
        :loading="isFetching"
        :ui="{
          base: 'table-fixed border-separate border-spacing-0',
          thead: '[&>tr]:bg-elevated/50 [&>tr]:after:content-none',
          tbody: '[&>tr]:last:[&>td]:border-b-0',
          th: 'py-2 first:rounded-l-lg last:rounded-r-lg border-y border-default first:border-l last:border-r',
          td: 'border-b border-default'
        }"
      />

      <div class="flex items-center justify-between gap-3 border-t border-default pt-4 mt-auto">
        <div class="text-sm text-muted">
          {{ table?.tableApi?.getFilteredSelectedRowModel().rows.length || 0 }} of
          {{ table?.tableApi?.getFilteredRowModel().rows.length || 0 }} row(s) selected.
        </div>

        <div class="flex items-center gap-1.5">
          <UPagination
            :default-page="(table?.tableApi?.getState().pagination.pageIndex || 0) + 1"
            :items-per-page="table?.tableApi?.getState().pagination.pageSize"
            :total="table?.tableApi?.getFilteredRowModel().rows.length"
            @update:page="(p: number) => table?.tableApi?.setPageIndex(p - 1)"
          />
        </div>
      </div>
    </template>
  </UDashboardPanel>
</template>
