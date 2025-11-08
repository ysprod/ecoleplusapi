export declare enum Role {
    FOUNDER = "FOUNDER",
    DIRECTOR = "DIRECTOR",
    ACCOUNTANT = "ACCOUNTANT",
    TEACHER = "TEACHER",
    EDUCATOR = "EDUCATOR",
    CANTEEN_MANAGER = "CANTEEN_MANAGER",
    DRIVER = "DRIVER",
    PARENT = "PARENT",
    COGES_PRESIDENT = "COGES_PRESIDENT"
}
export type ProfileType = string;
export declare class UserDto {
    _id?: string;
    email: string;
    name: string;
    matricule?: string;
    password: string;
    role: Role;
    profileType: ProfileType;
    emailVerified?: Date | null;
    firstName?: string;
    lastName?: string;
    phone?: string;
    birthDate?: Date;
    status?: string;
    photo?: string;
    avatar?: string;
    school?: string;
    teacher?: string;
    parent?: string;
    accountant?: string;
    gender?: string;
    createdAt?: string;
    updatedAt?: string;
    subjects?: string[];
}
