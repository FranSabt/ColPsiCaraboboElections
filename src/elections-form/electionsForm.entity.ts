import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum CILetterEmun {
  V = 'V',
  E = 'E',
}

export enum MunicipioCapitalEnum {
  BEJUMA = 'Bejuma',
  CARLOS_ARVELO = 'Guigue',
  DIEGO_IBARRA = 'Mariara',
  GUACARA = 'Guacara',
  JUAN_JOSE_MORA = 'Morón',
  LIBERTADOR = 'Tocuyito',
  LOS_GUAYOS = 'Los Guayos',
  MIRANDA = 'Miranda',
  MONTALBAN = 'Montalbán',
  NAGUANAGUA = 'Naguanagua',
  PUERTO_CABELLO = 'Puerto Cabello',
  SAN_DIEGO = 'San Diego',
  SAN_JOAQUIN = 'San Joaquín',
  VALENCIA = 'Valencia',
}

@Entity()
export class ElectionForm {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  secondName: string;

  @Column()
  lastName: string;

  @Column()
  secondLastName: string;

  @Column()
  CI: string;

  @Column()
  CILetter: CILetterEmun;

  @Column()
  fpv: string;

  @Column()
  email: string;

  @Column()
  celPhone: string;

  @Column()
  psi: string;

  @Column()
  address: MunicipioCapitalEnum;

  @Column({ type: 'bytea', nullable: true }) // Tipo para datos binarios en PostgreSQL
  Rif: Buffer;

  @Column({ default: false })
  nulled: boolean;
}
