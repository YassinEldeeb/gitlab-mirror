declare namespace NodeJS {
  export interface ProcessEnv {
/**
     * @example
     * ```
    process.env.GITLAB_TOKEN
    ```
     */
    GITLAB_TOKEN: string
/**
     * @example
     * ```
    process.env.GITHUB_ACCESS_TOKEN
    ```
     */
    GITHUB_ACCESS_TOKEN: string
/**
     * @example
     * ```
    process.env.GITHUB_USERNAME
    ```
     */
    GITHUB_USERNAME: string
/**
     * @example
     * ```
    process.env.GITHUB_REPO
    ```
     */
    GITHUB_REPO: string
/**
     * @example
     * ```
    process.env.DATABASE_URL
    ```
     */
    DATABASE_URL: string
/**
     * @example
     * ```
    process.env.SERVER_URL
    ```
     */
    SERVER_URL: string
  }
}
