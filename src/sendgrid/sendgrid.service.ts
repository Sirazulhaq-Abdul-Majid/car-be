import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as SendGrid from '@sendgrid/mail'

@Injectable()
export class SendgridService {
  constructor(private readonly configService: ConfigService) {
    SendGrid.setApiKey(this.configService.get<string>('SENDGRID_API_KEY'))
  }

  async sendMail(OTP: any, email: any) {
    const mail = {
      to: email,
      subject: "OTP for Junkcars Signup",
      from: "junkcars.help@outlook.com",
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
    }
    const transport = await SendGrid.send(mail)
    return transport
  }

  async sendForgetPasswordMail(OTP: number, email: string) {
    const mail = {
      to: email,
      subject: "OTP for Junkcars Account Password Reset",
      from: "junkcars.help@outlook.com",
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
    }
    const transport = await SendGrid.send(mail)
    return transport
  }
}
