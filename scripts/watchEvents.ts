import chokidar from 'chokidar'
import path from 'path'
import fs from 'fs'

let timeoutEnded = false
let watchTimeout = 1000

setTimeout(() => {
  timeoutEnded = true
}, watchTimeout)

console.log('\x1b[32m%s\x1b[0m', 'Listening for events directory changes..')

chokidar
  .watch(path.join(__dirname, '../src/events/'))
  .on('add', (filePath, _event) => {
    if (!timeoutEnded) {
      return
    }

    const possibleValues = [
      'push',
      'tag_push',
      'issue',
      'note',
      'merge_request',
      'wiki_page',
      'release',
    ]
    const eventName = filePath.split(path.sep).pop()!.split('.')[0]

    if (!possibleValues.includes(eventName)) {
      setTimeout(() => {
        fs.rmSync(filePath)
      }, 500)
    } else {
      const TEMPLATE = `import { eventHandler } from '../lib/eventHandler'
        
export default eventHandler<'${eventName}'>((event) => {
    
})`

      console.log('\x1b[36m%s\x1b[0m', `"events/${eventName}.ts" was added!`)
      fs.writeFileSync(filePath, TEMPLATE)
    }
  })
