import { injectable } from "tsyringe";
import { IMailProvider } from "../IMailProvider";
import nodemailer, { Transporter } from "nodemailer";
import handlebars from "handlebars";
import fs from "fs";
import {SES} from "aws-sdk";



@injectable()
class SESMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    this.client = nodemailer.createTransport({
      SES: new SES({
        apiVersion: "2010-12-01",
        region: process.env.AWS_REGION,
      })
    })

  }

  async sendMail(to: string, subject: string, variables: any, path: string): Promise<void> {
    console.log("Criou o client", this.client);

    //lê e transforma o arquivo em utf-8
    const templateFileContent = fs.readFileSync(path).toString("utf-8");

    //pega o arquivo e devolve ele como uma função
    const templateParse = handlebars.compile(templateFileContent);

    //pega a função e coloca as variáveis dentro para ter o html renderizado
    const templateHTML = templateParse(variables);

    await this.client.sendMail({
      to,
      from: "Rentx <gavazzonimaicom@gmail.com>",
      subject,
      html: templateHTML,
    });
  }

}

export { SESMailProvider };