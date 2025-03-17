<script setup lang="ts">
import { ref } from "vue";

interface Tag {
  id: number;
  name: string;
  color: string;
}

// Estado reactivo con etiquetas de ejemplo
const tags = ref<Tag[]>([
  { id: 1, name: "Trabajo", color: "#F59E0B" },
  { id: 2, name: "Personal", color: "#10B981" },
  { id: 3, name: "Ideas", color: "#3B82F6" },
]);

const selectedTag = ref<number | null>(null);

const selectTag = (id: number) => {
  selectedTag.value = id;
  console.log("Filtrar por etiqueta:", id);
};
</script>

<template>
  <aside class="w-64 h-screen bg-[#232334] text-white p-4">
    <h2 class="text-xl font-bold mb-4">Etiquetas</h2>

    <ul>
      <li
        v-for="tag in tags"
        :key="tag.id"
        class="flex items-center gap-2 p-2 rounded-md cursor-pointer"
        :class="{
          'bg-[#7F56D9]': selectedTag === tag.id,
          'hover:bg-[#1F1B2E]': selectedTag !== tag.id,
        }"
        @click="selectTag(tag.id)"
      >
        <span
          class="w-3 h-3 rounded-full"
          :style="{ backgroundColor: tag.color }"
        ></span>
        {{ tag.name }}
      </li>
    </ul>

    <button class="mt-4 bg-[#7F56D9] w-full py-2 rounded-lg hover:bg-[#6b46c1]">
      + Nueva Etiqueta
    </button>
  </aside>
</template>

<style scoped>
/* Estilos adicionales si es necesario */
</style>
