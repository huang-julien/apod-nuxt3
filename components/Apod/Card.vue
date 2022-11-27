<template>
  <Card :loading="loading" class="apod-card flex flex-col md:flex-row" with-image :image="hdurl || url">
    <div v-if="!error">
      <div class="p-5 h-full flex-col flex">
        <h2 class="font-bold text-2xl">
          {{ title }}
        </h2>
        <p class="text-sm">
          {{ explanation }}
        </p>
        <p v-if="copyright" class="w-100 flex justify-between mt-auto">
          Copyright: {{ copyright ?? 'NASA' }}
        </p>
      </div>
    </div>
    <slot v-else name="error" />
    <template #image>
      <div class="image--wrapper max-h-[50vh] md:max-h-[unset]">
        <iframe v-if="mediaType === 'video'" class="w-full max-h-[50vh]  md:max-h-[unset] mx-auto" :src="url" />
        <img v-else :src="hdurl || url" :alt="title" class=" max-h-[50vh] md:max-h-[unset] mx-auto">
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { withDefaults } from 'vue'
import Card from '@/components/Molecules/Card.vue'

withDefaults(defineProps<{
    loading?: boolean,
    title?: string,
    copyright?: string,
    url?: string,
    date?: string,
    explanation?: string
    error?: any,
    hdurl?: string,
    mediaType?: 'video' | 'image'
}>(), {
  loading: () => false,
  error: () => false,
  title: () => '',
  url: () => '',
  date: () => '',
  explanation: () => ''
})
</script>

<style scoped>
.image--wrapper {
    min-width: 25%;
}
</style>
