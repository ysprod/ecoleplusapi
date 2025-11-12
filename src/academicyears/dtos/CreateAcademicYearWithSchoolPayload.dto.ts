import { TermType } from '../../term/schemas/term.schema';

// Trimestre personnalisé transmis depuis le frontend
export interface CustomTermInput {
  name?: string;
  type?: TermType | string; // Peut être string lors de la saisie côté client
  startDate: Date | string;
  endDate: Date | string;
}

// Payload global pour POST /academicyears
export interface CreateAcademicYearWithSchoolPayload {
  // Champs école
  nom: string;
  localite: string;
  directeur: string;
  phone: string;
  email: string;
  statut?: string;
  niveaux?: string[];
  matricule?: string;

  // Champs année académique
  name: string; // ex: "2025-2026" ou libellé
  year?: string; // éventuel identifiant/affichage
  startDate: Date | string;
  endDate: Date | string;
  isCurrent?: boolean;
  user: string; // ObjectId sous forme string

  // Gestion des trimestres
  numberOfTerms?: number; // par défaut 3
  autoGenerateTerms?: boolean; // true si génération auto
  customTerms?: CustomTermInput[]; // liste si définie par l'utilisateur
}
