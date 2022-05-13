import { User } from "../user";
import { Comment } from "../myComment"

export interface CommentsWithUserDTO {
    user: User;
    comment: Comment[];
}