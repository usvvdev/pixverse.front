export interface AuthTokens {
  access_token: string
  refresh_token?: string
  token_type: string
}

export interface AuthCredentials {
  username: string
  password: string
}
