export declare class CreateSchoolDto {
    email: string;
    nom?: string;
    localite?: string;
    directeur?: string;
    address?: string;
    phone?: string;
    academicYear?: string;
    educationLevel?: string;
    location?: string;
    statut?: string;
    matricule?: string;
    niveaux?: string[];
    'services.cantine'?: boolean;
    'services.transport'?: boolean;
    'services.activites'?: boolean;
    'frais.transport.montant'?: number;
    'frais.activites.montant'?: number;
    'frais.cotisationCoges.montant'?: number;
}
