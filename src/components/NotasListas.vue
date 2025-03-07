<script setup lang="ts">
import { almacenamientoNotas } from "@/stores/Notas";
import NotasItem from "./NotasItem.vue";

const almacenamiento = almacenamientoNotas();
</script>

<template>
    <h2 class="text-xl font-semibold text-text-light mb-4">Notas Creadas</h2>
    <div class="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    <NotasItem
      v-for="nota in almacenamiento.OrdenarNotas"
      :key="nota.id"
      :nota="nota"
      @delete="almacenamiento.EliminarNotas"
      @update="almacenamiento.editarNotas"
    />
  </div>
</template>

