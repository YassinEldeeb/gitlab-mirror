import { Event, PossibleEventsType } from './types/events'
import path from 'path'

export const handleEvent = (type: Event, payload: PossibleEventsType) => {
  console.log(path.join(__dirname, `../events/${type}.ts`))
  require(path.join(__dirname, `../events/${type}.ts`)).default(payload)
}
