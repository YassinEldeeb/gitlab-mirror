export type Event =
  | 'push'
  | 'tag_push'
  | 'issue'
  | 'note'
  | 'merge_request'
  | 'wiki_page'
  | 'release'

export type PossibleEventsType =
  | PushEvent
  | TagPushEvent
  | IssueEvent
  | NoteEvent
  | MergeRequestEvent
  | WikiPageEvent
  | ReleaseEvent

type GetIndex<A extends any[], T> = {
  [K in keyof A]: A[K] extends T ? K : never
}[number]

type Switch<
  T extends { case: Event; value: PossibleEventsType }[],
  V extends Event
> = T[GetIndex<T, { case: V; value: any }>]['value']

export type EventPayload<T extends Event | never> = T extends never
  ? never
  : Switch<
      [
        { case: 'push'; value: PushEvent },
        { case: 'tag_push'; value: TagPushEvent },
        { case: 'note'; value: NoteEvent },
        { case: 'merge_request'; value: MergeRequestEvent },
        { case: 'wiki_page'; value: WikiPageEvent },
        { case: 'release'; value: ReleaseEvent }
      ],
      T
    >

// GitLab types Source are mostly from: https://github.com/ccckblaze/gitlab-webhook-events/blob/master/index.d.ts
export interface PushEvent {
  object_kind: Event
  before: string
  after: string
  ref: string
  checkout_sha: string
  user_id: number
  user_name: string
  user_username: string
  user_email: string
  user_avatar: string
  project_id: number
  project: Project
  repository: Repository
  commits: Commit[]
  total_commits_count: number
}

export interface TagPushEvent {
  object_kind: Event
  before: string
  after: string
  ref: string
  checkout_sha: string
  user_id: number
  user_name: string
  user_avatar: string
  project_id: number
  project: Project
  repository: Repository
  commits: Commit[]
  total_commits_count: number
}

export interface IssueEvent {
  object_kind: Event
  user: User
  project: Project
  repository: Repository
  object_attributes: IssueAttributes
  assignees: User[]
  assignee: User
  labels: Label[]
  changes: Changes
}

export interface IssueAttributes {
  id: number
  title: string
  assignee_ids: number[]
  assignee_id: number
  author_id: number
  project_id: number
  created_at: string
  updated_at: string
  position: number
  branch_name: string
  description: string
  milestone_id: number
  state: string
  iid: number
  url: string
  action: string
}

export interface NoteEvent {
  object_kind: Event
  user: User
  project_id: number
  project: Project
  repository: Repository
  object_attributes: NoteAttributes
  commit?: Commit
  merge_request?: MergeRequest
  issue?: Issue
  snippet?: Snippet
}

export interface NoteAttributes {
  id: number
  note: string
  noteable_type: string
  author_id: number
  created_at: string
  updated_at: string
  project_id: number
  attachment: any
  line_code: string
  commit_id: string
  noteable_id: number
  system: boolean
  st_diff: StDiff
  url: string
}

export interface MergeRequestEvent {
  object_kind: Event
  user: User
  project: Project
  repository: Repository
  object_attributes: MergeRequestAttributes
  labels: Label[]
  changes: Changes
}

export interface MergeRequestAttributes {
  id: number
  target_branch: string
  source_branch: string
  source_project_id: number
  author_id: number
  assignee_id: number
  title: string
  created_at: string
  updated_at: string
  milestone_id: null
  state: string
  merge_status: string
  target_project_id: number
  iid: number
  description: string
  source: Project
  target: Project
  last_commit: LastCommit
  work_in_progress: boolean
  url: string
  action: string
  assignee: User
}

export interface WikiPageEvent {
  object_kind: Event
  user: User
  project: Project
  wiki: Wiki
  object_attributes: WikiPageAttributes
}

export interface WikiPageAttributes {
  title: string
  content: string
  format: string
  message: string
  slug: string
  url: string
  action: string
}

export interface PipelineEvent {
  object_kind: Event
  object_attributes: PipelineAttributes
  user: User
  project: Project
  commit: Commit
  builds: Build[]
}

export interface PipelineAttributes {
  id: number
  ref: string
  tag: boolean
  sha: string
  before_sha: string
  status: string
  stages: string[]
  created_at: string
  finished_at: string
  duration: number
}

export interface BuildEvent {
  object_kind: Event
  ref: string
  tag: boolean
  before_sha: string
  sha: string
  build_id: number
  build_name: string
  build_stage: string
  build_status: string
  build_started_at: string
  build_finished_at: string
  build_duration: any
  build_allow_failure: boolean
  project_id: number
  project_name: string
  user: User
  commit: Commit
  repository: Repository
}

export interface StDiff {
  diff: string
  new_path: string
  old_path: string
  a_mode: string
  b_mode: string
  new_file: boolean
  renamed_file: boolean
  deleted_file: boolean
}

export interface Issue {
  id: number
  title: string
  assignee_ids: number[]
  assignee_id: number
  author_id: number
  project_id: number
  created_at: string
  updated_at: string
  position: number
  branch_name: string
  description: string
  milestone_id: number
  state: string
  iid: number
}

export interface Snippet {
  id: number
  title: string
  content: string
  author_id: number
  project_id: number
  created_at: string
  updated_at: string
  file_name: string
  expires_at: string
  type: string
  visibility_level: number
}

export interface Commit {
  id: string
  message: string
  timestamp: string
  url: string
  author: Author
}

export interface Build {
  id: number
  stage: string
  name: string
  status: string
  created_at: string
  started_at?: string
  finished_at?: string
  when: string
  manual: boolean
  user: User
  runner: any
  artifacts_file: ArtifactsFile
}

export interface ArtifactsFile {
  filename: string
  size: number
}

export interface Label {
  id: number
  title: string
  color: string
  project_id: number
  created_at: string
  updated_at: string
  template: boolean
  description: string
  type: string
  group_id: number
}

export interface Changes {
  updated_by_id: number[]
  updated_at: string[]
  labels: Labels
}

export interface Labels {
  previous: Label[]
  current: Label[]
}

export interface MergeRequest {
  id: number
  target_branch: string
  source_branch: string
  source_project_id: number
  author_id: number
  assignee_id: number
  title: string
  created_at: string
  updated_at: string
  milestone_id: number
  state: string
  merge_status: string
  target_project_id: number
  iid: number
  description: string
  position: number
  source: Project
  target: Project
  last_commit: LastCommit
  work_in_progress: boolean
  assignee: User
}

export interface ReleaseEvent {
  object_kind: Event
  id: number
  created_at: string
  description: string
  name: string
  released_at: string
  tag: string
  project: Project
  url: string
  action: string
  assets: Assets
  commit: Commit
}

export interface Assets {
  count: number
  links: {
    id: 1
    external: boolean
    link_type: string
    name: string
    url: string
  }[]

  sources: {
    format: string
    url: string
  }[]
}

export interface User {
  name: string
  username: string
  avatar_url: string
}

export interface LastCommit {
  id: string
  message: string
  timestamp: string
  url: string
  author: Author
}

export interface Author {
  name: string
  email: string
}

export interface Project {
  name: string
  description: string
  web_url: string
  avatar_url: string
  git_ssh_url: string
  git_http_url: string
  namespace: string
  visibility_level: number
  path_with_namespace: string
  default_branch: string
  homepage: string
  url: string
  ssh_url: string
  http_url: string
  id?: number
}

export interface Repository {
  name: string
  url: string
  description: string
  homepage: string
}

export interface Wiki {
  web_url: string
  git_ssh_url: string
  git_http_url: string
  path_with_namespace: string
  default_branch: string
}

export interface EventData<T> {
  event: string
  payload: T
  protocol: string
  host: string
  url: string
  path: string
}
