import { User } from "../user";
import { Comment } from "../myComment"
import { Post } from "../post";

export interface CommentsWithUserDTO {
    user: User;
    posts: Post[];
    comments: Comment[];
}