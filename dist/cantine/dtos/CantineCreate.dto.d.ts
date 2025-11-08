import { Types } from 'mongoose';
export declare class CantineCreateDto {
    date: Date;
    school: Types.ObjectId | string;
    menu: {
        entree?: string;
        platPrincipal: string;
        accompagnement?: string;
        dessert?: string;
    };
    prix: number;
    nombreRepas?: number;
    allergenes?: string[];
}
