import { eventHandler } from '../lib/eventHandler'
import { github, prisma } from '../setup'

export default eventHandler<'issue'>(async (event) => {
  const repo = {
    repo: process.env.GITHUB_REPO!,
    owner: process.env.GITHUB_USERNAME!,
  }
  const gitlabIssueID = event.object_attributes.iid
  const issueAction = event.object_attributes.action

  if (issueAction === 'open') {
    const {
      data: { number: githubIssueID },
    } = await github.issues.create({
      ...repo,
      title: event.object_attributes.title,
      body: event.object_attributes.description,
      labels: event.labels.map((e) => e.title),
      // TODO: map assignees to their github usernames'
    })

    await prisma.issue.create({
      data: {
        githubIssueID,
        gitlabIssueID,
      },
    })
  } else if (issueAction === 'close') {
    const existingIssue = await prisma.issue.findUnique({
      where: {
        gitlabIssueID,
      },
      select: {
        githubIssueID: true,
      },
    })
    if (existingIssue) {
      await github.issues.update({
        ...repo,
        state: 'closed',
        issue_number: existingIssue.githubIssueID,
      })
    }
  } else if (issueAction === 'update') {
    const existingIssue2 = await prisma.issue.findUnique({
      where: {
        gitlabIssueID,
      },
      select: {
        githubIssueID: true,
      },
    })

    if (existingIssue2) {
      await github.issues.update({
        ...repo,
        issue_number: existingIssue2.githubIssueID,
        title: event.changes.title?.current,
        body: event.changes.description?.current,
        labels: event.changes?.labels?.current.map((e) => e.title),
      })
    }
  } else if (issueAction === 'reopen') {
    await github.issues.update({ ...repo, issue_number: 3, state: 'open' })
  }
})
