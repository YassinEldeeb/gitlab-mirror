import { eventHandler } from '../lib/eventHandler'

export default eventHandler<'push'>((event) => {
  console.log('Push Event handled!')
})
