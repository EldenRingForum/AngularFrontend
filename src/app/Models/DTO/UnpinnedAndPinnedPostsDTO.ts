import { Post } from "../post";

export interface UnpinnedAndPinnedPostsDTO {
    unpinnedPosts: Post[];
    pinnedPosts: Post[];
}