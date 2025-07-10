import type { IUser } from '~/types/user'

export interface IMembersWithRole {
    nodes: IUser[]
    totalCount: number
}
