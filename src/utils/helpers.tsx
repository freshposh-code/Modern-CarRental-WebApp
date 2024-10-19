const url = `https://api.cloudinary.com/v1_1/dzsmwdpk7/image/upload`;

interface UploadResponse {
  asset_id: string;
  public_id: string;
  version: number;
  version_id: string;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  tags: string[];
  bytes: number;
  type: string;
  etag: string;
  placeholder: boolean;
  url: string;
  secure_url: string;
  original_filename: string;
}

const uploadImage = async (image: File): Promise<UploadResponse> => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "car_rental");
  
    const dataResponse = await fetch(url, {
      method: "POST",
      body: formData
    });
  
    const result = await dataResponse.json();
    console.log(result);
  
    if (!dataResponse.ok) {
      throw new Error(`Failed to upload image: ${result.error?.message || 'Unknown error'}`);
    }
  
    return result;
  };
  

export default uploadImage;
