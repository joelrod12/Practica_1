<script setup lang="ts">
import { ref, defineEmits } from "vue";

const emit = defineEmits(["save"]);
const etiquetas = ref("");
const color = ref("#7F56D9"); // Color predeterminado

const guardarEtiqueta = () => {
  const etiquetasArray = etiquetas.value.split(",").map((etiqueta) => etiqueta.trim());
  emit("save", { etiquetas: etiquetasArray, color: color.value });

  etiquetas.value = "";
  color.value = "#7F56D9"; // Restablecer color
};
</script>

<template>
  <form @submit.prevent="guardarEtiqueta">
    <h2 class="text-xl font-semibold text-text-light mb-4">Crear etiquetas</h2>

    <input
      v-model="etiquetas"
      placeholder="Etiquetas (separadas por comas)"
      class="w-full p-2 border border-gray-600 rounded-lg bg-transparent text-text-light placeholder-gray-400 focus:ring-2 focus:ring-highlight focus:outline-none mb-4"
    />

    <label class="block mb-4 text-text-light">Selecciona un color:</label>
    <input type="color" v-model="color" class="w-full h-10 cursor-pointer" />

    <button
      type="submit"
      class="w-full bg-highlight text-black font-semibold py-2 rounded-lg hover:bg-blue-300 bg-opacity-90 transition"
    >
      Guardar
    </button>
  </form>
</template>
