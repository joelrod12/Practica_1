<script setup lang="ts">
import { almacenamientoNotas } from "../stores/Notas";
import EtiquetasItem from "./EtiquetasItem.vue";

const almacenamiento = almacenamientoNotas();
</script>

<template>
  <div class="mt-6">
    <h2 class="text-xl font-semibold text-text-light mb-4">Etiquetas Creadas</h2>
    <div class="flex flex-wrap gap-2">
      <EtiquetasItem
        v-for="tags in almacenamiento.tags"
        :key="tags.id"
        :tags="tags"
        @update="almacenamiento.editarEtiquetas"
        @delete="almacenamiento.EliminarEtiquetas"
      />
    </div>
  </div>
</template>
