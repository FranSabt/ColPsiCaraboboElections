import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ElectionsFormService } from './elections-form.service';
import { ElectionsFormDto } from './elections-form.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { MailService } from 'src/mail/mail.service';

@Controller('elections-form')
export class ElectionsFormController {
  constructor(
    private readonly electionsFormService: ElectionsFormService,
    private readonly mailerService: MailService,
  ) {}

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

  @Put()
  async updateVoting(@Body() data: any){
    return this.electionsFormService.NullVote(data.id, data.password);
  }

  @Get('image/:id') 
  async getImage(@Param('id') id: number, @Res() res: Response) { 
    await this.electionsFormService.GetImage(id, res); 
  }
}
