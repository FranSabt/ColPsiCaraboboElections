import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ElectionsFormService } from './elections-form.service';
import { ElectionsFormDto } from './elections-form.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('elections-form')
export class ElectionsFormController {
  constructor(private readonly electionsFormService: ElectionsFormService) {}

  @Get()
  async getAllVotingData() {
    return await this.electionsFormService.GetAllVotingData();
  }

  @Post()
  @UseInterceptors(FileInterceptor('Rif'))
  async createElectionForm(
    @Body() data: ElectionsFormDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) {
      data.Rif = file.buffer.toString('base64');
    }
    return await this.electionsFormService.CreateElectionForm(data);
  }
}
