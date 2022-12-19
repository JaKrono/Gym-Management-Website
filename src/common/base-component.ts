import type { CategoryModel } from "./interfaces";
import { CategoryList } from "./category-list";

export class BaseComponent {

    public categoryValue: Record<number, CategoryModel> = {
        1: CategoryList[0],
        2: CategoryList[1],
        3: CategoryList[2],
        4: CategoryList[3],
        5: CategoryList[4],
        6: CategoryList[5],
    }

    getBase64(file: File) {
        if (!file) {
            return new Promise((resolve, reject) => {
                resolve('');
            });
        }
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                resolve(reader.result);
            };
        });
    }
}