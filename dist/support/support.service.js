"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupportService = void 0;
const common_1 = require("@nestjs/common");
const resend_1 = require("resend");
let SupportService = class SupportService {
    resend = new resend_1.Resend(process.env.RESEND_API_KEY);
    async postSupport(data) {
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
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Erreur lors de l\'envoi du message');
        }
    }
};
exports.SupportService = SupportService;
exports.SupportService = SupportService = __decorate([
    (0, common_1.Injectable)()
], SupportService);
//# sourceMappingURL=support.service.js.map