import { ApiService } from '@/services/api/ApiService';
import { IResponseUploadImageType } from '@/modules/my-account/constants';

class FileApi extends ApiService {
  public uploadFile(formData: FormData): Promise<IResponseUploadImageType> {
    return this.post<IResponseUploadImageType>('api/files', formData, null);
  }
}

export const fileApi = new FileApi();
