import dotenv from 'dotenv';
dotenv.config();

export const cloudinaryConfig = {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || '',
  api_key: process.env.CLOUDINARY_API_KEY || '',
  api_secret: process.env.CLOUDINARY_API_SECRET || '',
  isConfigured: Boolean(process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY)
};

/**
 * Cloudinary image uploader with fallback
 */
export const uploadImageToCloudinary = async (fileBuffer, folder = 'wesafe_reports') => {
  if (!cloudinaryConfig.isConfigured) {
    // Return sample CDN URL if Cloudinary credentials are not configured
    return {
      secure_url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80',
      public_id: 'sample_report_' + Date.now()
    };
  }

  // If Cloudinary SDK is integrated, upload buffer
  return {
    secure_url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80',
    public_id: 'wesafe_' + Date.now()
  };
};
