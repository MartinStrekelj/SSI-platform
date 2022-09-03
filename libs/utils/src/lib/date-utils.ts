import { format } from 'date-fns'

const COMMON_DATE_FORMAT = "dd.MM.yyyy 'at' kk:mm"

export const formatDate = (input?: string | Date, f = COMMON_DATE_FORMAT) => {
  if (!input) {
    return 'N/A'
  }

  let date
  if (typeof input === 'string') {
    date = new Date(input)
  } else {
    date = input
  }

  return format(date, f)
}
