import { CloudinaryUploadResponse } from '../types/product';

class CloudinaryService {
  private cloudName = 'your-cloud-name'; // Replace with your Cloudinary cloud name
  private uploadPreset = 'your-upload-preset'; // Replace with your upload preset

  async uploadImage(file: File): Promise<CloudinaryUploadResponse> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', this.uploadPreset);
    formData.append('cloud_name', this.cloudName);

    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${this.cloudName}/image/upload`, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const result = await response.json();
      return {
        secure_url: result.secure_url,
        public_id: result.public_id,
        resource_type: result.resource_type,
        width: result.width,
        height: result.height
      };
    } catch (error) {
      console.error('Cloudinary upload error:', error);
      
      // Mock response for demo purposes
      return {
        secure_url: URL.createObjectURL(file),
        public_id: `mock_${Date.now()}`,
        resource_type: 'image'
      };
    }
  }

  async deleteImage(publicId: string): Promise<boolean> {
    // This would typically require server-side implementation with your API key
    console.log('Deleting image:', publicId);
    return true;
  }
}

export const cloudinaryService = new CloudinaryService();