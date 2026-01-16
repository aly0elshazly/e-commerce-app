import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { v2 as cloudinary } from 'cloudinary';
import * as streamifier from 'streamifier';

@Injectable()
export class CloudnairyService {
  constructor(private readonly config: ConfigService) {
    cloudinary.config({
      cloud_name: this.config.get("cloud").cloud_name,
      api_key: this.config.get("cloud").api_key,
      api_secret: this.config.get("cloud").api_secret,
    });
    
  }

  upload(file: Buffer, folder = 'uploads', publicId?: string) {
    return new Promise<any>((resolve, reject) => {
      try {
        const upload = cloudinary.uploader.upload_stream(
          { folder, public_id: publicId, resource_type: 'image' },
          (error, result) => {
            if (error) return reject(error);
            if (!result) return reject(new Error('No result from Cloudinary'));
            resolve(result);
          }
        );
        streamifier.createReadStream(file).pipe(upload);
      } catch (err) {
        reject(err);
      }
    });
  }
}