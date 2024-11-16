import { User } from "./User.model";

export interface UsersResponse {
    rows: User[];
    total: number;
}