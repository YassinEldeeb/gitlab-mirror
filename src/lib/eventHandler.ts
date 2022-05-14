import { Event, EventPayload } from '../types/events'

export const eventHandler = <T extends Event = never>(
  handler: (event: EventPayload<T>) => void
) => {
  return handler
}
