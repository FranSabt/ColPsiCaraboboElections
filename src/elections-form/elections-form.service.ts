import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ElectionForm } from './electionsForm.entity';
import { Repository } from 'typeorm';
import { ElectionsFormDto } from './elections-form.dto';
import { MailService } from 'src/mail/mail.service';
import { google } from 'googleapis';
import * as fs from 'fs'; 
import * as path from 'path';

@Injectable()
export class ElectionsFormService {
  private sheetsClient;
  private readonly logger = new Logger(ElectionsFormService.name);

  constructor(
    @InjectRepository(ElectionForm)
    private readonly electionFormRepository: Repository<ElectionForm>,
    private readonly mailerService: MailService,
  ) {
    this.sheetsClient = google.sheets({
      version: 'v4',
      auth: 'AIzaSyDaa7Z5cEl5HbXOoqoQbEKdTr-gKqrrnFU',
    });
  }

  async CreateElectionForm(data: ElectionsFormDto) {
    const vote1 = await this.electionFormRepository.findOne({
      where: { CI: data.CI, nulled: false },
    });
    if (vote1) {
      return {msj: 'CI ya votó', succes:false };
    }
    const vote2 = await this.electionFormRepository.findOne({
      where: { fpv: data.fpv, nulled: false },
    });
    if (vote2) {
      return {msj: 'FPV ya votó', succes: false};
    }
    const rifBuffer = data.Rif ? Buffer.from(data.Rif, 'base64') : null;
    if (!rifBuffer) {
      return {msj: 'Falta imagen de RIF', succes:false};
    }
    const electionForm = this.electionFormRepository.create({
      ...data,
      Rif: rifBuffer,
    });
    const save = await this.electionFormRepository.save(electionForm);
    const html = this.mailerService.reportCsvHtml(save);
    const sendMail = await this.mailerService.sendCsvReport(
      html,
      electionForm.email,
    );

    // this.logger.log(sendMail);
    //await this.addDataToSheet(save);
    return {msj: 'Exito', succes: true};
  }

  /////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////

  private async addDataToSheet(electionForm: ElectionForm) {
    const spreadsheetId = 'Elections';
    const range = 'Sheet1!A:Z';
    const values = [
      [
        electionForm.id,
        electionForm.firstName,
        electionForm.secondName,
        electionForm.lastName,
        electionForm.secondLastName,
        electionForm.CILetter,
        electionForm.CI,
        electionForm.fpv,
        electionForm.Rif,
        electionForm.celPhone,
        electionForm.email,
        //electionForm.Rif ? electionForm.Rif.toString('base64') : '',
      ],
    ];
    const resource = { values };
    try {
      const result = await this.sheetsClient.spreadsheets.values.append({
        spreadsheetId,
        range,
        valueInputOption: 'RAW',
        resource,
      });
      this.logger.log(
        `Data appended to Google Sheet: ${result.data.updates.updatedRange}`,
      );
    } catch (error) {
      this.logger.error('Error appending data to Google Sheet', error);
    }
  }

  /////////////////////////////////////////
  /////////////////////////////////////////
  /////////////////////////////////////////

  GetAllVotingData() {
    return this.electionFormRepository.find();
  }

  /////////////////////////////////////////
  /////////////////////////////////////////
  /////////////////////////////////////////

  async NullVote(id: number, password: string) {
    if (password !== 'skinner_freud') return;

    const vote = await this.electionFormRepository.findOne({
      where: { id: id },
    });

    if (!vote) {
      return {msj: 'Voto no encontrado', succes:false};;
    }

    vote.nulled = !vote.nulled;

    await this.electionFormRepository.save(vote);

    return {msj: 'Voto modificado', succes:true};;
  }

  /////////////////////////////////////////
  /////////////////////////////////////////
  /////////////////////////////////////////

  async GetImage(id: number, res: any) { 
    console.log('Buscando imagen');
    const electionForm = await this.electionFormRepository.findOne({
      where: { id },
    });
    if (!electionForm || !electionForm.Rif){
      return 'Image not found';
    }
    console.log(electionForm)

    // Convert the buffer to a base64 string 
    const base64Image = electionForm.Rif.toString('base64'); 
    // Set headers to download the file 
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=${electionForm.fpv}.jpg`,
    );
    res.setHeader('Content-Type', 'image/png');

    res.send(Buffer.from(base64Image, 'base64'));
  }
}
