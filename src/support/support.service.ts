import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { SupportDataDto } from './dtos/support-data.dto';
import { Resend } from 'resend';

@Injectable()
export class SupportService {
  private resend = new Resend(process.env.RESEND_API_KEY);

  async postSupport(data: SupportDataDto): Promise<{ success: boolean }> {
    const { name, email, message, matricule } = data;
    try {
      await this.resend.emails.send({
        from: 'support@ecoleplus.ci',
        to: 'support@ecoleplus.ci',
        subject: `Nouveau message de ${name}`,
        html: `
          <h1>Nouveau message de contact</h1>
          <p><strong>Nom:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${matricule ? `<p><strong>Matricule:</strong> ${matricule}</p>` : ''}
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `
      });
      return { success: true };
    } catch (error) {
      throw new InternalServerErrorException('Erreur lors de l\'envoi du message');
    }
  }
}
