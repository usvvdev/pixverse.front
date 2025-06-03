export interface Account {
  id: number
  username: string
  password: string
  balance: number
  is_active: boolean
}

export interface Template {
  id: number
  template_id?: number
  prompt: string
  name: string
  category: string
  preview: URL
}

export interface Style {
  id: number
  template_id?: number
  prompt: string
  name: string
  preview: URL
}

export interface Stat {
  title: string
  icon: string
  value: number | string
  variation: number
  formatter?: (value: number) => string
}

export interface Sale {
  id: string
  date: string
  status: SaleStatus
  email: string
  amount: number
}

export interface Notification {
  id: number
  unread?: boolean
  sender: User
  body: string
  date: string
}

export type Period = 'daily' | 'weekly' | 'monthly'

export interface Range {
  start: Date
  end: Date
}
