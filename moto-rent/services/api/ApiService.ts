import { HTTP_CREATED, HTTP_NO_CONTENT, HTTP_OK } from '@/constants/http';
import { IVehicleQueryParamsType } from '@/modules/list-of-vehicles/constants';

export class ApiService {
  public options(method: string, body: BodyInit | null, headers: Record<string, string> | null): RequestInit {
    const requestInit: RequestInit = {
      method,
    };

    if (body !== null) requestInit.body = body;

    if (headers !== null) requestInit.headers = headers;

    return requestInit;
  }

  public buildQueryString(params: IVehicleQueryParamsType): string {
    const queryParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach(val => queryParams.append(`${key}[]`, String(val)));
        return;
      }

      if (value !== '' && value !== undefined && value !== null) {
        queryParams.append(key, String(value));
      }
    });

    return queryParams.toString();
  }

  private async request<T>(endpoint: string, options: RequestInit): Promise<T> {
    return fetch(`/${endpoint}`, options)
      .then(async (res) => {
        if (res.status === HTTP_OK) {
          return await res.json();
        }

        if (res.status === HTTP_CREATED) {
          return await res.json();
        }

        if (res.status === HTTP_NO_CONTENT) {
          return res;
        }
        throw await res.json();
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  public async post<T>(endpoint: string, body: BodyInit | null, headers: Record<string, string> | null): Promise<T> {
    return this.request<T>(endpoint, this.options('POST', body, headers));
  }

  public async put<T>(endpoint: string, body: BodyInit | null, headers: Record<string, string> | null): Promise<T> {
    return this.request<T>(endpoint, this.options('PUT', body, headers));
  }

  public async get<T>(endpoint: string, body: BodyInit | null = null, headers: Record<string, string> | null = null): Promise<T> {
    return this.request<T>(endpoint, this.options('GET', body, headers));
  }
}
