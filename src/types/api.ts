export type BaseEntity = {
  id: string
}

export const RoleEnum =  {
  USER: 'USER',
  BARBER: 'BARBER',
  ADMIN: 'ADMIN'
} as const

export type Role = keyof typeof RoleEnum 

export type Entity<T> = {
  [K in keyof T]: T[K]
} & BaseEntity

export type UserEntity = Entity<{
  first_name: string
  last_name: string
  username: string
  email: string
  role: Array<Role>
  password: string
}>