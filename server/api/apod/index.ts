/* eslint-disable camelcase */
import NodeCache from 'node-cache'
import { format, eachDayOfInterval, startOfToday } from 'date-fns'
import useNasaApi from '~~/composables/useNasaApi'

const apodCache = new NodeCache({
  // store for 7 days
  stdTTL: 10080,
  useClones: false,
  maxKeys: 360
})

const api = useNasaApi()

export default defineEventHandler(async (event): Promise<ApodResponse|ApodResponse[]> => {
  const query = await getQuery(event) as unknown as ApodQuery

  const { date, start_date, end_date } = query

  if (!start_date) {
    const dateToFetch = date ?? format(startOfToday(), DATE_FORMAT)
    const cached = apodCache.get(dateToFetch) as unknown as ApodResponse
    if (cached) {
      return cached
    }
    // return today's Apod
    const apod = await api.getApod({ date: dateToFetch })
    apodCache.set(dateToFetch, apod)
    return apod
  }

  return await Promise.all(eachDayOfInterval({
    start: new Date(start_date),
    end: end_date ? new Date(end_date) : startOfToday()
  }).map(async (date) => {
    const formattedDate = format(date, DATE_FORMAT)
    const cached = apodCache.get(formattedDate) as unknown as ApodResponse
    if (cached) {
      return cached
    }

    // return today's Apod
    const apod = await api.getApod({ date: formattedDate })
    apodCache.set(formattedDate, apod)
    return apod
  }))
})
