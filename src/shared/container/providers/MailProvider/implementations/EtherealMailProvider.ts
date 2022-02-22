import { injectable } from "tsyringe";
import { IMailProvider } from "../IMailProvider";
import nodemailer, { Transporter } from "nodemailer";
import handlebars from "handlebars";
import fs from "fs";



@injectable()
class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    nodemailer.createTestAccount().then((account) => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
        tls: {
          rejectUnauthorized: false
        }
      });

      this.client = transporter;
    }).catch(err => console.error(err));

  }

  async sendMail(to: string, subject: string, variables: any, path: string): Promise<void> {
    console.log("Criou o client", this.client);

    //lê e transforma o arquivo em utf-8
    const templateFileContent = fs.readFileSync(path).toString("utf-8");

    //pega o arquivo e devolve ele como uma função
    const templateParse = handlebars.compile(templateFileContent);

    //pega a função e coloca as variáveis dentro para ter o html renderizado
    const templateHTML = templateParse(variables);

    const message = await this.client.sendMail({
      to,
      from: "Rentx <noreplay@rentx.com.br>",
      subject,
      html: templateHTML,
    });

    console.log("Message sent: %s", message.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(message));
  }

}

export { EtherealMailProvider };