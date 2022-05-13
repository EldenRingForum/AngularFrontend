import { Comment } from "./myComment";
import { Post } from "../Models/post";

export interface User {
    id: number;
    userName: string;
    profilePicture: string;
    email: string;
    posts: Post[];
    comments: Comment[];
}

export class ClassUser {
    id: number;
    userName: string;
    profilePicture: string;
    email: string;
    posts: Post[];
    comments: Comment[];
}