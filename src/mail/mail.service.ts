import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ElectionForm } from 'src/elections-form/electionsForm.entity';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  reportCsvHtml(userData: ElectionForm): string {
    const {
      id,
      firstName,
      secondName,
      lastName,
      secondLastName,
      CI,
      CILetter,
      fpv,
      email,
      celPhone,
      address,
      psi,
    } = userData;
    return `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reporte de Usuario - Netcom Plus</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            color: #333;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 40px auto;
            background-color: #ffffff;
            padding: 30px;
            border-radius: 12px;
            box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
          }
          .logo {
            text-align: center;
            margin-bottom: 20px;
          }
          .logo img {
            max-width: 150px;
          }
          h2 {
            color: #0B5394;
            text-align: center;
            font-size: 26px;
            margin-bottom: 20px;
          }
          p {
            font-size: 16px;
            line-height: 1.6;
            color: #333333;
            text-align: justify;
            margin: 8px 0;
          }
          .user-data {
            margin-top: 20px;
            font-size: 15px;
            color: #333;
            line-height: 1.5;
          }
          .user-data p {
            display: flex;
            justify-content: space-between;
            padding: 8px;
            border-bottom: 1px solid #e0e0e0;
          }
          .user-data p:last-child {
            border-bottom: none;
          }
          .highlight {
            color: #D9534F;
            font-weight: bold;
          }
          .footer {
            margin-top: 30px;
            text-align: center;
            font-size: 12px;
            color: #999999;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="logo">
            <a href='https://postimages.org/' target='_blank'>
              <img src='https://i.postimg.cc/cLqxBVcT/COlPSi.jpg' border='0' alt='Netcom-Logo'/>
            </a>
          </div>
          <h2>Colegio de Psicologos de Carabobo - Votación de Representantes 2024</h2>
  
          <div class="user-data">
            <p><span><strong>Voto N°:</strong></span> <span>${id}</span></p>
            <p><span><strong>Nombre:</strong></span> <span>${firstName} ${secondName}</span></p>
            <p><span><strong>Apellidos:</strong></span> <span>${lastName} ${secondLastName}</span></p>
            <p><span><strong>Cédula:</strong></span> <span>${CILetter}-${CI}</span></p>
            <p><span><strong>FPV:</strong></span> <span>${fpv}</span></p>
            <p><span><strong>Email:</strong></span> <span>${email}</span></p>
            <p><span><strong>Teléfono Celular:</strong></span> <span>${celPhone}</span></p>
            <p><span><strong>Dirección:</strong></span> <span>${address}</span></p>
            <p><span><strong>Voto por :</strong></span> <span>${psi}</span></p>

          </div>
          
          <div class="footer">
            <p>&copy; 2024 FranSabt.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  async sendUserConfirmation(user: User, token: string) {
    const url = `example.com/auth/confirm?token=${token}`;

    await this.mailerService.sendMail({
      to: user.email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Welcome to Nice App! Confirm your Email',
      template: 'confirmation', // `.hbs` extension is appended automatically
      context: {
        // ✏️ filling curly brackets with content
        name: user.name,
        url,
      },
    });
  }

  async sendCsvReport(html: string, mailAddress: string) {
    await this.mailerService.sendMail({
      to: [mailAddress, 'infocolegiopsicologoscarabobo@gmail.com'],
      subject: `Colegio de Psicologos del Estado Carabobo - Voto Registrado`,
      html: html,
    });
  }
}

// ./../user/user.entity
export interface User {
  email: string;
  name: string;
}
