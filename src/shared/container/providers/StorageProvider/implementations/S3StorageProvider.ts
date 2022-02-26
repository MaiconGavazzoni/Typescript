import { S3 } from "aws-sdk";
import fs from "fs";
import mime from "mime";
import { resolve} from "path";
import NODE_ENV from ".env";
import upload from "@config/upload";
import { DeleteObjectRequest, PutObjectRequest } from "aws-sdk/clients/s3";
import { IStorageProvider } from "../IStorageProvider";

class S3StorageProvider implements IStorageProvider {
  private client: S3;

  constructor(){
    this.client = new S3({
      region: process.env.AWS_BUCKET_REGION
    })
  }
  async save(file: string, folder: string): Promise<string> {
    const originalName = resolve(upload.tmpFolder, file);

    const fileContent = await fs.promises.readFile(originalName);

    const type = mime.getType(originalName) as String;

    const data = {
      Bucket: `${process.env.AWS_BUCKET}/${folder}`,
      ACL: 'public-read',
      Key: file,
      Body: fileContent,
      ContentType : type,
    } as PutObjectRequest;

    await this.client.putObject(data).promise();

    await fs.promises.unlink(originalName);

    return file;
  }
  async delete(file: string, folder: string): Promise<void> {
    const data = {
      Bucket: `${process.env.AWS_BUCKET}/${folder}`,
      Key: file
    } as DeleteObjectRequest;
    await this.client.deleteObject(data).promise();
  }

}

export { S3StorageProvider };