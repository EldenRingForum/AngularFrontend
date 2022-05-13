export interface Comment {
    id: number;
    postId: number;
    userId: number | null;
    text: string;
    timeOfCreation: string;
    flaggedInapropriate: boolean;
}