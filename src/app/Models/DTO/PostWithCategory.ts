import { Category } from "../category";
import { Post } from "../post";

export interface PostWithCategoryDTO {
    post: Post;
    category: Category;
    commentAmount: number
}