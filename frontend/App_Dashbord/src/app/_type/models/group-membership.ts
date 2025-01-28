import { GroupMembershipEnum } from "../enum/group-membership.enum";
import { Group } from "./group";
import { User } from "./user";

export interface GroupMembership{   
    id: Id
    group_id: Group,
    user_id: User,
    joined_at: Date
}

export interface Id{
    id: string,
    role: GroupMembershipEnum
}
