import { ApiProperty } from '@nestjs/swagger';

export class SchoolResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  nom: string;

  @ApiProperty()
  localite: string;

  @ApiProperty()
  directeur: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  academicYear: string;

  @ApiProperty()
  educationLevel: string;

  @ApiProperty()
  location: string;

  @ApiProperty()
  dateCreation: Date;

  @ApiProperty()
  niveaux: string[];

  @ApiProperty()
  statut: string;

  @ApiProperty()
  matricule: string;

  @ApiProperty()
  nbPersonnel: number;

  @ApiProperty()
  services: {
    cantine: boolean;
    transport: boolean;
    activites: boolean;
  };

  @ApiProperty()
  frais: {
    transport: { montant: number; devise: string };
    activites: { montant: number; devise: string };
    cotisationCoges: { montant: number; devise: string };
  };

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
