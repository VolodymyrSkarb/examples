import { ApiService } from '@/services/api/ApiService';
import { IFormDataType } from '@/modules/contact-us-form/constants';

class FormApi extends ApiService {
  public submitForm(formData: IFormDataType): Promise<Response> {
    const json: string = JSON.stringify(formData);

    return this.post('api/contact-us', json, { 'Content-Type': 'application/json' });
  }
}

export const formApi = new FormApi();
