import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VerifyEmail } from 'src/auth/database/verify-email.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NodemailerService {
  constructor(private readonly mailerService: MailerService, @InjectRepository(VerifyEmail) private verifyEmailRepo: Repository<VerifyEmail>) { }
  async sendMail(OTP: number, email: string) {
    this.mailerService.sendMail({
      to: email,
      from: 'junkcars.help@outlook.com',
      subject: 'OTP for Junkcars Signup',
      html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
  <div style="margin:50px auto;width:70%;padding:20px 0">
    <div style="border-bottom:1px solid #eee">
      <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Junkcars Co.</a>
    </div>
    <p style="font-size:1.1em">Hi,</p>
    <p>Thank you for signing up with Junkcars . Use the following OTP to complete your Sign Up procedures. OTP is valid for 5 minutes</p>
    <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${OTP}</h2>
    <p style="font-size:0.9em;">Regards,<br />Junk Cars Support</p>
    <hr style="border:none;border-top:1px solid #eee" />
    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
      <p>Junkcars Co.</p>
      <p>Useless cars, always</p>
    </div>
  </div>
</div>`
    })
  }
  async sendForgetPasswordMail(OTP: number, email: string) {
    this.mailerService.sendMail({
      to: email,
      from: 'junkcars.help@outlook.com',
      subject: 'OTP for Junkcars Account Password Reset',
      html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
<div style="margin:50px auto;width:70%;padding:20px 0">
  <div style="border-bottom:1px solid #eee">
    <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Junkcars Co.</a>
  </div>
  <p style="font-size:1.1em">Hi,</p>
  <p>Use the following OTP to reset your password to Junk Cars. OTP is valid for 5 minutes</p>
  <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${OTP}</h2>
  <p style="font-size:0.9em;">Regards,<br />Junk Cars support</p>
  <hr style="border:none;border-top:1px solid #eee" />
  <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
    <p>Junkcars Co.</p>
    <p>Useless cars, always</p>
  </div>
</div>
</div>`
    })
  }

}
