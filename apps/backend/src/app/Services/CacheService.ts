import * as cache from 'memory-cache'

interface IUpdateCacheArgs {
  key: string
  value: string
  duration: number // in minutes
}

interface IReadCacheArgs {
  key: string
}

export const saveToCache = (args: IUpdateCacheArgs) => {
  const duration = durationToMinutes(args.duration)
  cache.put(args.key, args.value, duration)
}

export const readCacheKey = (args: IReadCacheArgs) => {
  return cache.get(args.key)
}

export const removeFromCache = (args: IReadCacheArgs) => {
  return cache.del(args.key)
}

const durationToMinutes = (duration: number) => duration * 60 * 1000
