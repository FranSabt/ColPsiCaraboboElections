import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ElectionForm } from './electionsForm.entity';
import { Repository } from 'typeorm';
import { ElectionsFormDto } from './elections-form.dto';

@Injectable()
export class ElectionsFormService {
  constructor(
    @InjectRepository(ElectionForm)
    private readonly electionFormRepository: Repository<ElectionForm>,
  ) {}

  async CreateElectionForm(data: ElectionsFormDto) {
    const vote1 = await this.electionFormRepository.findOne({
      where: { CI: data.CI },
    });
    console.log(vote1);
    if (vote1) {
      return 'CI ya votó';
    }
    const vote2 = await this.electionFormRepository.findOne({
      where: { fpv: data.fpv },
    });
    console.log(vote2);
    if (vote2) {
      return 'FPV ya votó';
    }

    const rifBuffer = data.Rif ? Buffer.from(data.Rif, 'base64') : null;
    if (!rifBuffer) {
      console.log(rifBuffer);
      return 'Rif no puede ser vacío';
    }

    // Crear una instancia parcial del modelo
    const electionForm = this.electionFormRepository.create({
      ...data,
      Rif: rifBuffer,
    });

    // Guardar en la base de datos
    return this.electionFormRepository.save(electionForm);
  }

  /////////////////////////////////////////
  /////////////////////////////////////////
  /////////////////////////////////////////

  GetAllVotingData() {
    return this.electionFormRepository.find();
  }
}
