<script setup lang="ts">
import { ref, computed } from "vue";
import { almacenamientoNotas } from "@/stores/Notas";

const almacenamiento = almacenamientoNotas();

// Obtener todas las etiquetas únicas
const availableTags = computed(() => {
  const etiquetas = new Set<string>();
  almacenamiento.notas.forEach(nota =>
    nota.etiquetas.forEach(etiqueta => etiquetas.add(etiqueta))
  );
  return Array.from(etiquetas);
});
</script>

<template>
  <div class="bg-white shadow-md rounded-lg p-4 flex flex-wrap items-center gap-4">
    <!-- Filtrar por etiqueta -->
    <div class="flex flex-col">
      <label class="text-gray-700 font-medium">Filtrar por etiqueta:</label>
      <select v-model="almacenamiento.filtrarEtiquetas"
        class="border border-gray-300 rounded-lg p-2 text-gray-700 focus:ring-2 focus:ring-purple-500">
        <option :value="null">Todas</option>
        <option v-for="etiqueta in availableTags" :key="etiqueta" :value="etiqueta">
          {{ etiqueta }}
        </option>
      </select>
    </div>

    <!-- Ordenar notas -->
    <div class="flex flex-col">
      <label class="text-gray-700 font-medium">Ordenar:</label>
      <select v-model="almacenamiento.Ordenar"
        class="border border-gray-300 rounded-lg p-2 text-gray-700 focus:ring-2 focus:ring-purple-500">
        <option value="nuevo">Más recientes</option>
        <option value="viejo">Más antiguas</option>
      </select>
    </div>

    <!-- Botones de acción -->
    <div class="flex gap-2">
      <button @click="almacenamiento.BorrarTodasNotas"
        class="bg-red-500 text-white py-2 px-4 rounded-lg shadow hover:bg-red-600 transition">
        Eliminar Todas
      </button>

      <button v-if="almacenamiento.filtrarEtiquetas"
        @click="almacenamiento.BorrasNotasEtiquetas(almacenamiento.filtrarEtiquetas)"
        class="bg-purple-500 text-white py-2 px-4 rounded-lg shadow hover:bg-purple-600 transition">
        Eliminar "{{ almacenamiento.filtrarEtiquetas }}"
      </button>
    </div>
  </div>
</template>

