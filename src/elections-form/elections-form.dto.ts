import {
  IsString,
  IsOptional,
  IsBase64,
  IsEnum,
  IsEmail,
  Matches,
} from 'class-validator';
import { CILetterEmun, MunicipioCapitalEnum } from './electionsForm.entity';

export class ElectionsFormDto {
  @IsString()
  firstName: string;

  @IsString()
  secondName: string;

  @IsString()
  lastName: string;

  @IsString()
  secondLastName: string;

  @IsString()
  @Matches(/^\d+$/, { message: 'CI must contain only numbers' })
  CI: string;

  @IsEnum(CILetterEmun)
  CILetter: CILetterEmun;

  @IsString()
  @Matches(/^\d+$/, { message: 'fpv must contain only numbers' })
  fpv: string;

  @IsEmail()
  email: string;

  @IsString()
  @Matches(/^\d+$/, { message: 'celPhone must contain only numbers' })
  celPhone: string;

  @IsEnum(MunicipioCapitalEnum)
  address: MunicipioCapitalEnum;

  @IsOptional()
  @IsBase64()
  Rif?: string; // Imagen en base64
}
