<script setup lang="ts">
import { almacenamientoNotas } from './stores/Notas'
import NotasFormulario from './components/NotasFormulario.vue'
import NotasListas from './components/NotasListas.vue'
import FiltrarNotas from './components/FiltrarNotas.vue'
import EtiquetasFormulario from './components/EtiquetasFormulario.vue'
import EtiquetasLista from './components/EtiquetasLista.vue'
import AppSidebar from './components/AppSidebar.vue'

const almacenamiento = almacenamientoNotas()

const agregarNuevaNota = (notas: { titulo: string; contenido: string; etiquetas: string[] }) => {
  almacenamiento.agregarNotas(notas.titulo, notas.contenido, notas.etiquetas)
}
const agregarNuevaEtiqueta = (tags: { etiquetas: string[], color: string }) => {
  almacenamiento.agregarEtiquetas(tags.etiquetas, tags.color)
}
</script>

<template>
  <div>
    <AppSidebar/>
    <h1 class="text-3xl font-bold text-gray-800 text-center mb-6">Notas</h1>

    <!-- Formulario para agregar notas -->
    <div class="mb-6">
      <NotasFormulario @save="agregarNuevaNota" />
      <EtiquetasFormulario @save="agregarNuevaEtiqueta" />
      <EtiquetasLista />

    </div>

    <!-- Lista de notas -->
    <FiltrarNotas />
    <NotasListas />
  </div>
</template>
