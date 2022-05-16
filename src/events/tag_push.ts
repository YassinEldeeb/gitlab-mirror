import { eventHandler } from '../lib/eventHandler'

export default eventHandler<'tag_push'>((event) => {
  console.log(event.ref)
})
