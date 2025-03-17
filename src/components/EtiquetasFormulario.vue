<script setup lang="ts">
import { ref, defineEmits } from "vue";

const emit = defineEmits(["save"]);
const etiquetas = ref("");
const color = ref("#7F56D9"); // Color predeterminado

const guardarEtiqueta = () => {
  const etiqueta = etiquetas.value.trim();
  if (!etiqueta) return;

  emit("save", { etiquetas: [etiqueta], color: color.value });

  etiquetas.value = "";
  color.value = "#7F56D9";
};
</script>

<template>
  <div class="bg-secondary p-6 rounded-2xl w-full max-w-md mx-auto">
    <h2 class="text-lg font-semibold text-text-light mb-4">Crear etiqueta</h2>

    <form @submit.prevent="guardarEtiqueta" class="space-y-4">
      <div class="flex flex-col">
        <label for="etiqueta" class="text-sm text-text-dark mb-1">Nombre de la etiqueta</label>
        <input
          id="etiqueta"
          v-model="etiquetas"
          placeholder="Ej. Trabajo, Personal..."
          class="w-full p-2 border border-gray-600 rounded-lg bg-primary text-text-light placeholder-gray-400 focus:ring-2 focus:ring-highlight focus:outline-none"
        />
      </div>

      <div class="flex items-center gap-3">
        <label class="text-sm text-text-dark">Color:</label>
        <input
          type="color"
          v-model="color"
          class="w-10 h-10 rounded-lg border border-gray-500 cursor-pointer transition hover:opacity-80"
        />
      </div>

      <button
      type="submit"
      class="w-full bg-highlight text-black font-semibold py-2 rounded-lg hover:bg-blue-300 bg-opacity-90 transition"
    >
      Guardar
    </button>
    </form>
  </div>
</template>
