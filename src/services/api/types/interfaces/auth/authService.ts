interface AuthUserService {
  id: number
  title: string
}

export interface AuthUserServices {
  items: AuthUserService[]
  page: number
  pages: number
  size: number
  total: number
}
