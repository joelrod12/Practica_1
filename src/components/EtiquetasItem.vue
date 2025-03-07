<script setup lang="ts">
import { ref, defineProps, defineEmits } from "vue";
import { faPen, faTrash, faSave, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const props = defineProps(["tags"]);
const emit = defineEmits(["delete", "update"]);

const editando = ref(false);
const etiquetaEditada = ref({ ...props.tags });

const guardarCambios = () => {
  emit("update", etiquetaEditada.value.id, etiquetaEditada.value.etiquetas, etiquetaEditada.value.color);
  editando.value = false;
};
</script>

<template>
  <div
    class="flex items-center gap-3 p-4 rounded-xl transition-all shadow-lg border border-gray-300 bg-white"
    :style="{ backgroundColor: editando ? '#F3F4F6' : props.tags.color }"
  >
    <div v-if="!editando" class="flex items-center justify-between w-full">
      <span class="text-gray-800 font-semibold text-sm">
        {{ props.tags.etiquetas}}
      </span>
      <div class="flex gap-2">
        <button
          @click="editando = true"
          class="text-gray-600 hover:text-blue-500 transition-all"
          title="Editar"
        >
          <FontAwesomeIcon icon={faPen} class="w-5 h-5" />
        </button>
        <button
          @click="emit('delete', props.tags.id)"
          class="text-gray-600 hover:text-red-500 transition-all"
          title="Eliminar"
        >
          <FontAwesomeIcon icon={faTrash} class="w-5 h-5" />
        </button>
      </div>
    </div>

    <div v-else class="flex flex-wrap items-center gap-3 w-full">
      <input
        v-model="etiquetaEditada.etiquetas"
        class="flex-1 p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
        placeholder="Editar etiquetas"
      />
      <input
        type="color"
        v-model="etiquetaEditada.color"
        class="w-8 h-8 cursor-pointer border rounded-md"
      />
      <button
        @click="guardarCambios"
        class="px-4 py-2 bg-green-500 text-white rounded-md text-sm hover:bg-green-600 transition-all shadow-md"
        title="Guardar cambios"
      >
        <FontAwesomeIcon icon={faSave} class="mr-2 w-5 h-5" /> Guardar
      </button>
      <button
        @click="editando = false"
        class="px-4 py-2 bg-gray-400 text-white rounded-md text-sm hover:bg-gray-500 transition-all shadow-md"
        title="Cancelar"
      >
        <FontAwesomeIcon icon={faTimes} class="mr-2 w-5 h-5" /> Cancelar
      </button>
    </div>
  </div>
</template>

<style scoped>
/* Estilos adicionales si es necesario */
</style>
