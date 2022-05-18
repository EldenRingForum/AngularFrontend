import { Comment } from "./myComment";
import { User } from "./user";

export interface Post {
    id: number;
    title: string;
    categoryId: number;
    userId: number;
    text: string;
    dateOfCreation: string;
    stickied: boolean;
    flaggedInapropriate: boolean;
    comments: Comment[];
    user: User
}