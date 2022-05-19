import { Post } from "../Models/post";

export interface Category {
    id: number;
    categoryName: string;
    introText: string;
    imageLink: string
    post: Post[];
}