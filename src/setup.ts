import { Octokit, App } from 'octokit'
import { PrismaClient } from '@prisma/client'

export const { rest: github } = new Octokit({
  auth: process.env.GITHUB_ACCESS_TOKEN,
})

export const prisma = new PrismaClient()
