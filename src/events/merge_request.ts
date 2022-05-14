import { eventHandler } from '../lib/eventHandler'

export default eventHandler<'merge_request'>((event) => {
  console.log('Merge Request Event handled!')
})
