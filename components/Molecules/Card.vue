<template>
  <div class="card border-1 border-gray-300 bg-gray-300 text-black rounded-lg overflow-hidden">
    <template v-if="loading">
      <div v-if="withImage" class="skeleton-wrapper md:w-1/3">
        <Skeleton class="flex-1" />
      </div>
      <div class="mt-4 px-5 py-3">
        <p>
          <Skeleton class="flex-1 h-5 w-1/4" />
        </p>
        <p>
          <Skeleton class="flex-1 h-5 w-2/3" />
        </p>
      </div>
    </template>
    <template v-else>
      <slot name="image">
        <div class="image--wrapper">
          <img format="webp" quality="80" :src="image" class="card-image" :class="imageClass" />
        </div>
      </slot>
      <slot>
        <div class="p-5 h-full flex flex-col">
          <h2 class="text-xl">
            {{ title }}
          </h2>
          <h3 class="text-lg">
            {{ subTitle }}
          </h3>
        </div>
      </slot>
    </template>
  </div>
</template>

<script setup lang="ts">
import { withDefaults } from 'vue'
import Skeleton from '~~/components/Atoms/Skeleton'

withDefaults(defineProps<{
    loading?: boolean,
    title?: string,
    subTitle?: string,
    image?: string,
    withImage?: boolean,
    imageClass?: string
}>(), {
  loading: () => false,
  withImage: () => false
})
</script>

<style scoped lang="scss">
.skeleton-wrapper {
    min-height: 150px;
    min-width: 150px;
    display: flex;
}

p {
    margin-top: 1em;
}
</style>
