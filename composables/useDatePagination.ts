import type { Ref } from 'vue'
import { format, isFuture, add } from 'date-fns'
import { watch, computed } from '#imports'

interface useDatePaginationOpts {
    /**
     * date format to send to the callback as argument
     * @default "yyyy-MM-dd"
     * @see https://date-fns.org/v2.29.3/docs/format
     */
    dateFormat: string,
    /**
     * immediate trigger callback
     * @default false
     */
    immediate: boolean
}

/**
 * composable to handle a pagination with date
 * @param {Ref<number>} date
 */
export default function useDatePagination (date: Ref<number>, callback: (d: string) => void | Promise<void>, opts: Partial<useDatePaginationOpts> = {}) {
  const {
    dateFormat = DATE_FORMAT,
    immediate = false
  } = opts

  /**
    * trigger a callback each time the date change
    */
  watch(date, () => {
    const formattedDate = format(date.value, dateFormat)
    callback(formattedDate)
  }, { immediate })

  const canGoNext = computed(() => !isFuture(add(date.value, {
    days: 1
  })))

  /**
    * set previous day on the date
    */
  function previousDay () {
    date.value = add(date.value, { days: -1 }).getTime()
  }

  /**
    * set next day on the date if it is possible
    */
  function nextDay () {
    const nextDay = add(date.value, { days: 1 }).getTime()
    if (canGoNext.value) {
      date.value = nextDay
    }
  }

  return {
    nextDay,
    previousDay,
    canGoNext
  }
}
