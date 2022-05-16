import { eventHandler } from '../lib/eventHandler'

export default eventHandler<'release'>((event) => {
  console.log(event)
})
