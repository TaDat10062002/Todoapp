// src/cloudinary/cloudinary.service.ts
import { Injectable } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  /**
   * Upload ảnh từ URL – dùng cho imageUrl dạng string
   */
  async uploadImageFromUrl(imageUrl: string): Promise<UploadApiResponse> {
    try {
      const result = await cloudinary.uploader.upload(imageUrl, {
        folder: 'nest',
      });
      return result;
    } catch (error) {
      throw new Error('Upload from URL failed: ' + error.message);
    }
  }
}
