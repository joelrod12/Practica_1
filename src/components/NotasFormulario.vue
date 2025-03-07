<script setup lang="ts" >
import { ref, defineEmits } from "vue";

const emit = defineEmits(["save"]);

const titulo = ref("");
const contenido = ref("");
const etiquetas = ref("");

const guardarNota = () => {
  emit("save", { titulo: titulo.value, contenido: contenido.value, etiquetas: etiquetas.value.split(",") });
  titulo.value = "";
  contenido.value = "";
  etiquetas.value = "";
};

</script>

<template>
  <form @submit.prevent="guardarNota" class="bg-secondary p-6 rounded-2xl w-full max-w-lg mx-auto">
    <h2 class="text-xl font-semibold text-text-light mb-4">Crear Nota</h2>

    <input
      v-model="titulo"
      placeholder="Título"
      required
      class="w-full p-2 border border-gray-600 rounded-lg bg-transparent text-text-light placeholder-gray-400 focus:ring-2 focus:ring-highlight focus:outline-none mb-3"
    />

    <textarea
      v-model="contenido"
      placeholder="Contenido"
      class="w-full p-2 border border-gray-600 rounded-lg bg-transparent text-text-light placeholder-gray-400 focus:ring-2 focus:ring-highlight focus:outline-none mb-3 resize-none h-32"
    ></textarea>

    <input
      v-model="etiquetas"
      placeholder="Etiquetas (separadas por comas)"
      class="w-full p-2 border border-gray-600 rounded-lg bg-transparent text-text-light placeholder-gray-400 focus:ring-2 focus:ring-highlight focus:outline-none mb-4"
    />

    <button
      type="submit"
      class="w-full bg-highlight bg-blue-500 text-black font-semibold py-2 rounded-lg hover:bg-blue-300 bg-opacity-90 transition"
    >
      Guardar
    </button>
  </form>
</template>



