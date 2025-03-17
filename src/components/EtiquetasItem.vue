<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue'
import { Pencil, Trash2, Save, X } from 'lucide-vue-next'

const props = defineProps(['tags'])
const emit = defineEmits(['delete', 'update'])

const editando = ref(false)
const etiquetaEditada = ref({ ...props.tags })

const guardarCambios = () => {
  emit(
    'update',
    etiquetaEditada.value.id,
    etiquetaEditada.value.etiquetas,
    etiquetaEditada.value.color,
  )
  editando.value = false
}
</script>

<template>
  <div
          class=" text-white text-xs font-medium px-3 py-1 rounded-xl transition-all shadow-lg border border-gray-300 bg-white"
              :style="{ backgroundColor: editando ? '#F3F4F6' : props.tags.color }"
  >
    <div v-if="!editando" class="flex items-center justify-between w-full">
      <div class="flex flex-wrap gap-2 mt-4 justify-center sm:justify-start">
        <span
          v-for="etiqueta in Array.isArray(props.tags.etiquetas) ? props.tags.etiquetas : []"
          :key="etiqueta"

        >
          {{ etiqueta }}
        </span>
        <span
          v-if="!props.tags.etiquetas || props.tags.etiquetas.length === 0"
          class="text-gray-500"
        >
          No hay etiquetas
        </span>

        <div class="flex gap-2">
          <button
          @click="editando = true"
          class="text-gray-600 hover:text-blue-500 transition-all"
          title="Editar"
          >
          <Pencil class="w-5 h-5" />
        </button>
        <button
          @click="emit('delete', props.tags.id)"
          class="text-gray-600 hover:text-red-500 transition-all"
          title="Eliminar"
          >
          <Trash2 class="w-5 h-5" />
        </button>
      </div>
      </div>
    </div>


    <div v-else class="flex flex-col gap-3">
      <input
        v-model="etiquetaEditada.etiquetas"
        class="w-full p-3 border rounded-md text-sm bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Escribe la etiqueta"
        @input="
          etiquetaEditada.etiquetas = ($event.target as HTMLInputElement).value
            .split(',')
            .map((e) => e.trim())
            .filter((e) => e)
        "
      />

      <div class="flex items-center gap-3">
        <input type="color" v-model="etiquetaEditada.color" class="w-10 h-10 cursor-pointer border rounded-md" />

        <button
          @click="guardarCambios"
          class="px-4 py-2 bg-green-500 text-white rounded-md text-sm hover:bg-green-600 transition-all shadow-md flex items-center gap-2"
          title="Guardar cambios"
        >
          <Save class="w-5 h-5" /> Guardar
        </button>
        <button
          @click="editando = false"
          class="px-4 py-2 bg-gray-400 text-white rounded-md text-sm hover:bg-gray-500 transition-all shadow-md flex items-center gap-2"
          title="Cancelar"
        >
          <X class="w-5 h-5" /> Cancelar
        </button>
      </div>
    </div>
  </div>
</template>
