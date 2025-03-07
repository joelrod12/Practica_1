import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'

export const almacenamientoNotas = defineStore('notas', () => {
  const notas = ref<
    { id: number; titulo: string; contenido: string; etiquetas: string[]; Creado: number }[]
  >([])
  const tags = ref<{ id: number; etiquetas: string[]; color: string }[]>([])
  const filtrarEtiquetas = ref<string | null>(null)
  const Ordenar = ref<'nuevo' | 'viejo'>('nuevo')

  // Cargar notas desde LocalStorage
  const Cargarnotas = () => {
    const storednotas = localStorage.getItem('notas')
    if (storednotas) {
      notas.value = JSON.parse(storednotas)
      console.log('Notas cargadas desde LocalStorage:', notas.value)
    }
  }

  // cargar las etiquetas al LocalStorage
  const CargarEtiquetas = () => {
    const storedTags = localStorage.getItem('tags')
    if (storedTags) {
      tags.value = JSON.parse(storedTags)
      console.log('Etiquetas cargadas desde LocalStorage:', tags.value)
    }
  }

  // Guardar notas en LocalStorage
  watch(
    notas,
    (nuevasNotas) => {
      localStorage.setItem('notas', JSON.stringify(nuevasNotas))
    },
    { deep: true },
  )

  // guardar etiquetas en LocalStorage
  watch(
    tags,
    (nuevasTags) => {
      localStorage.setItem('tags', JSON.stringify(nuevasTags))
    },
    { deep: true },
  )

  //agregar las notas en LocalStorage
  const agregarNotas = (titulo: string, contenido: string, etiquetas: string[]) => {
    notas.value.push({ id: Date.now(), titulo, contenido, etiquetas, Creado: Date.now() })
  }

  //agregar las etiquetas en LocalStorage
  const agregarEtiquetas = (etiquetas: string[], color: string) => {
    tags.value.push({ id: Date.now(), etiquetas, color })
  }

  // Eliminar las notas de LocalStorage
  const EliminarNotas = (id: number) => {
    notas.value = notas.value.filter((nota) => nota.id !== id)
  }

  // Eliminar las etiquetas de LocalStorage
  const EliminarEtiquetas = (id: number) => {
    tags.value = tags.value.filter((tag) => tag.id !== id)
  }

  // Editar las notas de LocalStorage
  const editarNotas = (
    id: number,
    NuevoTitulo: string,
    NuevoContenido: string,
    NuevaEtiquetas: string[],
  ) => {
    const nota = notas.value.find((nota) => nota.id === id)
    if (nota) {
      nota.titulo = NuevoTitulo
      nota.contenido = NuevoContenido
      nota.etiquetas = NuevaEtiquetas
    }
  }

  // editar las etiquetas de localStorage
  const editarEtiquetas = (id: number, NuevaEtiquetas: string[], NuevoColor: string) => {
    tags.value = tags.value.map((tag) =>
      tag.id === id ? { ...tag, etiquetas: NuevaEtiquetas, color: NuevoColor } : tag,
    )
  }

  // Filtrar las notas por etiquetas
  const filtrarNotas = computed(() => {
    return filtrarEtiquetas.value
      ? notas.value.filter((nota) => nota.etiquetas.includes(filtrarEtiquetas.value!))
      : notas.value
  })

  //ordenar las notas
  const OrdenarNotas = computed(() => {
    return [...filtrarNotas.value].sort((a, b) => {
      return Ordenar.value === 'nuevo' ? b.Creado - a.Creado : a.Creado - b.Creado
    })
  })

  //borrar todas las notas
  const BorrarTodasNotas = () => {
    notas.value = []
  }

  //borrar todas las notas por etiquetas
  const BorrasNotasEtiquetas = (etiqueta: string) => {
    notas.value = notas.value.filter((nota) => !nota.etiquetas.includes(etiqueta))
  }

  Cargarnotas()
  CargarEtiquetas()
  return {
    notas,
    tags,
    agregarNotas,
    EliminarNotas,
    editarNotas,
    filtrarEtiquetas,
    OrdenarNotas,
    Ordenar,
    BorrarTodasNotas,
    BorrasNotasEtiquetas,
    agregarEtiquetas,
    editarEtiquetas,
    EliminarEtiquetas,
  }
})
