<script setup lang="ts">
import { useTemplateRef, h, ref, watch, resolveComponent } from 'vue'
import { upperFirst } from 'scule'
import type { TableColumn } from '@nuxt/ui'
import { useFetch } from '@vueuse/core'
import { getPaginationRowModel, type Row } from '@tanstack/table-core'
import type { Style } from '../types'

const UAvatar = resolveComponent('UAvatar')
const UButton = resolveComponent('UButton')
const UBadge = resolveComponent('UBadge')
const UDropdownMenu = resolveComponent('UDropdownMenu')
const UCheckbox = resolveComponent('UCheckbox')

const toast = useToast()
const table = useTemplateRef('table')

const fileInput = ref<HTMLInputElement>();
const currentEditingStyle = ref<Style | null>(null);
const isUploading = ref(false);

const columnFilters = ref([{
  id: 'name',
  value: ''
}])

const columnVisibility = ref()
const rowSelection = ref({ 1: true })
const isDeleting = ref(false)

const openFileDialog = (style: Style) => {
  currentEditingStyle.value = style;
  fileInput.value?.click();
};

const { data, isFetching } = useFetch('/dashboard/v1/styles', { initialData: [] }).json<Style[]>()

async function deleteStyle(id: number) {
  isDeleting.value = true
  try {
    const ids = Array.isArray(id) ? id : [id];

    await Promise.all(ids.map(id =>
      useFetch(`/dashboard/v1/style/${id}`, {
        method: 'DELETE'
      })
    ));

    toast.add({
      title: 'Успешно',
      description: `Удалено ${ids.length} стиль(ей)`,
      color: 'success'
    })

  } catch (err) {
    toast.add({
      title: 'Ошибка',
      description: 'Не удалось удалить стиль',
      color: 'error',
    })
    console.error('Delete error:', err)
  }
  finally {
    isDeleting.value = false
  }
}

const handleFileUpload = async (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (!input.files?.length || !currentEditingStyle.value) return;

  const file = input.files[0];
  const formData = new FormData();
  formData.append('preview', file);

  isUploading.value = true;

  try {
    const { data, error } = await useFetch(
      `/dashboard/v1/style/${currentEditingStyle.value.id}`,
      {
        method: 'PUT',
        body: formData
      }
    ).json();

    if (error.value) {
      throw error.value;
    }

    // Обновляем данные в таблице
    const updatedIndex = data.value.findIndex(
      (s: Style) => s.id === currentEditingStyle.value?.id
    );
    if (updatedIndex !== -1) {
      data.value[updatedIndex].preview = URL.createObjectURL(file);
    }

    toast.add({
      title: 'Успешно',
      description: 'Фотография обновлена',
      color: 'success'
    });
  } catch (err) {
    toast.add({
      title: 'Ошибка',
      description: 'Не удалось обновить фотографию',
      color: 'error'
    });
    console.error('Upload error:', err);
  } finally {
    isUploading.value = false;
    currentEditingStyle.value = null;
    if (input) input.value = '';
  }
};

function getRowItems(row: Row<Style>) {
  return [
    {
      type: 'label',
      label: 'Действия'
    },
    {
      label: 'Скопировать текст стиля',
      icon: 'i-lucide-copy',
      onSelect() {
        navigator.clipboard.writeText(row.original.prompt)
        toast.add({
          title: 'Скопировано в буфер обмена',
          description: 'Текст промта скопирован в буфер обмена'
        })
      }
    },
    {
      type: 'separator'
    },
    {
      label: 'Редактировать стиль',
      icon: 'i-lucide-list'
    },
    {
      type: 'separator'
    },
    {
      label: 'Удалить стиль',
      icon: 'i-lucide-trash',
      color: 'error',
      onSelect() {
        const confirmDelete = confirm(`Удалить стиль ${row.original.name}?`)
        if (confirmDelete) {
          deleteStyle(row.original.id)
        }
      }
    }
  ]
}

const columns: TableColumn<Style>[] = [
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
      h('div', {
        class: 'absolute inset-0 bg-black bg-opacity-30 rounded-md opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center',
        onClick: (e) => {
          e.stopPropagation();
          openFileDialog(row.original);
        }
      }, [
        h('i', {
          class: 'i-lucide-upload text-white text-lg cursor-pointer hover:text-primary'
        })
      ])
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
  <UDashboardPanel id="styles">
    <template #header>
      <UDashboardNavbar title="Стили">
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
          placeholder="Поиск стилей..."
          @update:model-value="table?.tableApi?.getColumn('username')?.setFilterValue($event)"
        />

        <div class="flex flex-wrap items-center gap-1.5">
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
