export declare class SchoolResponseDto {
    id: string;
    email: string;
    nom: string;
    localite: string;
    directeur: string;
    address: string;
    phone: string;
    academicYear: string;
    educationLevel: string;
    location: string;
    dateCreation: Date;
    niveaux: string[];
    statut: string;
    matricule: string;
    nbPersonnel: number;
    services: {
        cantine: boolean;
        transport: boolean;
        activites: boolean;
    };
    frais: {
        transport: {
            montant: number;
            devise: string;
        };
        activites: {
            montant: number;
            devise: string;
        };
        cotisationCoges: {
            montant: number;
            devise: string;
        };
    };
    createdAt: Date;
    updatedAt: Date;
}
