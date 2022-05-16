import { NextFunction, Request, Response } from 'express'

export const auth = (req: Request, res: Response, next: NextFunction) => {
  if (req.headers['x-gitlab-token'] === process.env.GITLAB_TOKEN) {
    next()
  } else {
    res.status(401).send({ error: "gitlab-token doesn't match!" })
  }
}
