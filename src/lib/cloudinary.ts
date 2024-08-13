import { Cloudinary } from "@cloudinary/url-gen";
import { upload } from "cloudinary-react-native";
import { UploadApiOptions, UploadApiResponse } from "cloudinary-react-native/lib/typescript/src/api/upload/model/params/upload-params";

// Create a Cloudinary instance and set your cloud name.
export const cld = new Cloudinary({
  cloud: {
    cloudName: process.env.EXPO_PUBLIC_ClOUDINARY,
  }
});

export const uploadImage = async (file:string|undefined) => {
  const options = {
    upload_preset: 'Default',
    unsigned: true,
  }
  return new Promise<UploadApiResponse>(async (resolve, reject) => {

    await upload(cld, {
      file: file, options: options, 
      callback: (error: any, response: any) => {
        if(error){
          reject(error || !response);
        }
        else{
          resolve(response);
        }
        
      }
    })
  })

}

