<script setup lang="ts">
import { ref, defineProps, defineEmits } from "vue";

const props = defineProps(["nota"]);
const emit = defineEmits(["delete", "update"]);

const editando = ref(false);
const notaEditada = ref({ ...props.nota });

const guardarCambios = () => {
  emit("update", notaEditada.value.id, notaEditada.value.titulo, notaEditada.value.contenido, notaEditada.value.etiquetas);
  editando.value = false;
};
</script>

<template>
  <div class="bg-white shadow-lg rounded-2xl p-6 hover:shadow-2xl transition-all max-w-lg w-full mx-auto border border-gray-200 sm:max-w-xl md:max-w-2xl lg:max-w-3xl">
    <div v-if="editando">
      <input
        v-model="notaEditada.titulo"
        class="w-full p-3 border rounded-lg text-lg font-semibold bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Título de la nota"
      />
      <textarea
        v-model="notaEditada.contenido"
        class="w-full p-3 mt-3 border rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Contenido de la nota"
      ></textarea>
      <input
        v-model="notaEditada.etiquetas"
        class="w-full p-3 mt-3 border rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Etiquetas separadas por comas"
        @input="notaEditada.etiquetas = ($event.target as HTMLInputElement).value.split(',').map(e => e.trim())"
      />
      <div class="flex flex-col sm:flex-row justify-end gap-3 mt-5">
        <button
          @click="guardarCambios"
          class="py-2 px-5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all shadow-md"
        >
          Guardar
        </button>
        <button
          @click="editando = false"
          class="py-2 px-5 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-all shadow-md"
        >
          Cancelar
        </button>
      </div>
    </div>

    <div v-else>
      <h3 class="text-2xl font-bold text-gray-900 break-words text-center sm:text-left">{{ props.nota.titulo }}</h3>
      <p class="text-sm text-gray-700 mt-2 break-words text-center sm:text-left">{{ props.nota.contenido }}</p>

      <div class="flex flex-wrap gap-2 mt-4 justify-center sm:justify-start">
        <span
          v-for="etiqueta in props.nota.etiquetas"
          :key="etiqueta"
          class="bg-blue-100 text-blue-700 text-xs font-medium px-3 py-1 rounded-full"
        >
          {{ etiqueta }}
        </span>
        <span v-if="props.nota.etiquetas?.length === 0" class="text-gray-500">No hay etiquetas</span>
      </div>

      <div class="flex flex-col sm:flex-row justify-center sm:justify-end gap-3 mt-5">
        <button
          @click="editando = true"
          class="py-2 px-5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all shadow-md"
        >
          ✏️ Editar
        </button>
        <button
          @click="emit('delete', props.nota.id)"
          class="py-2 px-5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all shadow-md"
        >
          🗑️ Eliminar
        </button>
      </div>
    </div>
  </div>
</template>
