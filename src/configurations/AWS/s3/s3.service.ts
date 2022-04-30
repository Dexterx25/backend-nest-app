import { AWSCredentialsService } from '../credentials/credentials.service';
import { DeleteObjectRequest } from 'aws-sdk/clients/s3';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';

@Injectable()
export class S3Service {
  private s3Bucket!: string;
  private S3!: AWS.S3;
  constructor(
    private readonly config: ConfigService,
    private readonly credentials: AWSCredentialsService,
  ) {
    this.setup();
  }

  private setup = () => {
    this.S3 = new AWS.S3({
      credentials: this.credentials.generate,
      region: this.config.get<string>('AWS_S3_REGION'),
    });
    this.s3Bucket = this.config.get<string>('AWS_S3_BUCKET_NAME') as string;
  };

  upload = async (file: Express.Multer.File, path: string) => {
    const Key = `${path}.${file.originalname.split('.')[1]}`;
    try {
      return await this.S3.upload({
        Key,
        ACL:'public-read',
        Bucket: this.s3Bucket,
        Body: file.buffer,
        ContentType: file.mimetype,
      }).promise();
    } catch (error) {
      throw error;
    }
  };

  uploadRaw = async (file: Express.Multer.File, path: string) => {
    const Key = `${path}.${file.originalname.split('.')[1]}`;
    try {
      return await this.S3.upload({
        Key,
        Bucket: this.s3Bucket,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: 'public-read',
      }).promise();
    } catch (error) {
      throw error;
    }
  };

  uploadJPEG = async (file: Express.Multer.File, path: string) => {
    const Key = `${path}.jpeg`;
    try {
      return await this.S3.upload({
        Key,
        Bucket: this.s3Bucket,
        Body: file.buffer,
        ContentType: file.mimetype,
      }).promise();
    } catch (error) {
      throw error;
    }
  };

  uploadPublic = async (file: Express.Multer.File, path: string) => {
    try {
      return await this.S3.upload({
        Key: path,
        Bucket: this.s3Bucket,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: 'public-read',
      }).promise();
    } catch (error) {
      throw error;
    }
  };

  generatePresignedURL = async (path: string, type?: string) => {
    let ContentType: string = type ?? 'image/jpeg';
    try {
      const presignedPUTURL = await this.S3.getSignedUrlPromise('putObject', {
        Bucket: this.s3Bucket,
        Key: path,
        Expires: 6000,
        ContentType,
      });
      return presignedPUTURL;
    } catch (error) {
      throw error;
    }
  };

  generateReadURL = async (path: string) => {
    try {
      const presignedPUTURL = await this.S3.getSignedUrlPromise('getObject', {
        Bucket: this.s3Bucket,
        Key: path,
      });
      return presignedPUTURL;
    } catch (error) {
      throw error;
    }
  };

  get = async (Key: string) => {
    try {
      return await this.S3.getObject({ Bucket: this.s3Bucket, Key }).promise();
    } catch (error) {
      throw error;
    }
  };

  checkObject = async (path: string) => {
    try {
      const params = {
        Bucket: this.s3Bucket,
        Key: path,
      };
      await this.S3.headObject(params).promise();
      return true;
    } catch (error) {
      return false;
    }
  };

  delete = async (param: DeleteObjectRequest) => {
    await this.S3.deleteObject(param).promise();
  };
}
