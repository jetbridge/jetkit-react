export interface IUser {
  readonly id?: number | string
  readonly email?: string
}

export interface IUserCredential {
  readonly user?: IUser
}
