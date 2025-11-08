import { Types } from 'mongoose';
export declare class CantineUpdateDto {
    id: Types.ObjectId | string;
    date?: Date;
    menu?: {
        entree?: string;
        platPrincipal?: string;
        accompagnement?: string;
        dessert?: string;
    };
    prix?: number;
    nombreRepas?: number;
    allergenes?: string[];
}
