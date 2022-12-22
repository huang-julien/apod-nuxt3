<template>
  <Header />
  <main class="container px-5 flex-1  mx-auto">
    <div class="flex my-3">
      <button
        class="bg-white w-7 hover:bg-neutral-400 rounded-tl-sm rounded-bl-sm rounded-none"
        title="go to previous day"
        @click="previousDay"
      >
        <Icon name="akar-icons:chevron-left" class="text-black mx-auto" />
      </button>
      <NDatePicker
        v-model:value="date"
        class="rounded-none"
        :is-date-disabled="(e: number) => e > new Date().getTime()"
      />
      <button
        class="bg-white w-7 hover:bg-neutral-400  rounded-tr-sm rounded-br-sm rounded-none"
        title="go to next day"
        :disabled="!canGoNext"
        @click="nextDay"
      >
        <Icon name="akar-icons:chevron-right" class="text-black  mx-auto" />
      </button>
    </div>
    <ApodCard
      class="mx-auto my-5 md:mx-0 container"
      :loading="loading"
      :error="error"
      v-bind="apod"
      :media-type="apod?.media_type"
    >
      <template #error>
        <div class="p-5">
          An error has occured when fetching data.
          <button class="info" @click="() => refreshApod()">
            reload
          </button>
        </div>
      </template>
    </ApodCard>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { NDatePicker } from 'naive-ui'
import { format, isValid, startOfToday } from 'date-fns'
import ApodCard from '../components/Apod/Card.vue'
import Header from '@/components/Header.vue'

useHead({
  title: 'Nuxt 3 APOD',
  htmlAttrs: {
    lang: 'en'
  },
  meta: [
    {
      name: 'description',
      content: 'APOD website using NASA Open api, built with nuxt 3'
    }
  ]
})

const route = useRoute()
const router = useRouter()

const date = ref(isValid(new Date(route.query.date as string)) ? new Date(route.query.date as string).getTime() : startOfToday().getTime())

const formattedDate = computed(() => {
  return format(date.value, DATE_FORMAT)
})

const query = computed(() => ({
  date: formattedDate.value
}))

const apods = useState<Record<string, ApodResponse>>('apods', () => ({}))

const { data: apod, refresh: refreshApod, pending: loading, error } = await useAsyncData('apods', async () => {
  const apod = apods.value[formattedDate.value]

  if (apod) {
    return apod
  }
  const res = await $fetch('/api/apod', { query: query.value }) as ApodResponse
  apods.value[formattedDate.value] = (formattedDate.value, res)
  return res
})

const { previousDay, nextDay, canGoNext } = useDatePagination(date, (s) => {
  router.push(`/?date=${s}`)
  refreshApod()
})
</script>
