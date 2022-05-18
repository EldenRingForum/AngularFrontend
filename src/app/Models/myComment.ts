import { User } from "./user";

export interface Comment {
    id: number;
    postId: number;
    userId: number | null;
    text: string;
    timeOfCreation: string;
    flaggedInapropriate: boolean;
    user: User
}


export class ClassComment {
    id: number;
    postId: number;
    userId: number | null;
    text: string;
    timeOfCreation: string;
    flaggedInapropriate: boolean;
    user: User
}