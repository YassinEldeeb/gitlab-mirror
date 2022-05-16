require('dotenv').config()
import express from 'express'
import { handleEvent } from './lib/handleEvent'
import { auth } from './middleware/auth'
import { PossibleEventsType } from './lib/types/events'
import { prisma } from './setup'

const app = express()

app.use(express.json())

app.get('/profilePic/:id', async (req, res) => {
  const user = await prisma.user.findUnique({ where: { id: req.params.id } })

  res.set('Content-Type', 'image/png')
  res.send(user?.profilePic)
})

app.use(auth)

app.post('/', (req, res) => {
  handleEvent((req.body as PossibleEventsType).object_kind, req.body)
  res.send()
})

app.listen(3000, () => {
  console.log('Running!')
})
