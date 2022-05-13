import { Category } from "../category";
import { User } from "../user";

export interface CategoriesWithModeratorsDTO {
    users: User[];
    category: Category;
}