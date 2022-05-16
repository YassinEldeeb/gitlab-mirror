import { differenceInDays } from 'date-fns'
import { getUserImage } from '../helpers/getUserImage'
import { eventHandler } from '../lib/eventHandler'
import { github, prisma } from '../setup'

export default eventHandler<'note'>(async (event) => {
  const repo = {
    repo: process.env.GITHUB_REPO!,
    owner: process.env.GITHUB_USERNAME!,
  }
  const gitlabID = event.user.id

  let user = await prisma.user.findUnique({
    where: { gitlabID },
  })

  if (user && differenceInDays(user.updatedAt, Date.now()) > 7) {
    const genImage = await getUserImage(event.user.avatar_url, event.user.name)

    await prisma.user.update({
      data: {
        profilePic: genImage,
      },
      where: { gitlabID },
    })
  } else {
    const genImage = await getUserImage(event.user.avatar_url, event.user.name)

    user = await prisma.user.create({
      data: {
        gitlabID,
        profilePic: genImage,
      },
    })
  }

  const commentTemplate = `![${event.user.name}](${process.env.SERVER_URL}/profilePic/${user.id})
  ${event.object_attributes.note}`

  switch (event.object_attributes.noteable_type) {
    case 'Issue':
      const data = await prisma.issue.findUnique({
        where: { gitlabIssueID: event.issue!.iid },
        select: { githubIssueID: true },
      })

      if (data) {
        await github.issues.createComment({
          ...repo,
          body: commentTemplate,
          issue_number: data.githubIssueID,
        })
      }
  }
})
