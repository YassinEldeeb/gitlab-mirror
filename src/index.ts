require('dotenv').config()
import express from 'express'
import { handleEvent } from './lib/mergeEvents'
import { auth } from './middleware/auth'
import { PossibleEventsType } from './types/EventName'

const app = express()

app.use(express.json())
app.use(auth)

app.post('/', (req, res) => {
  handleEvent((req.body as PossibleEventsType).object_kind, req.body)
  res.send()
})

app.listen(3000, () => {
  console.log('Running!')
})
