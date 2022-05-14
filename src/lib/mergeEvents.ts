import { Event, PossibleEventsType } from '../types/EventName'
import path from 'path'

export const handleEvent = (type: Event, payload: PossibleEventsType) => {
  require(path.join(__dirname, `../events/${type}.ts`)).default()
}
