import { ApiService } from '@/services/api/ApiService';
import { IVerificationResponseType } from '@/modules/my-account/constants';
import { ISignUpType, IUserUpdateType, LoginRequest } from '@/modules/sign-up-form/constants/constants';
import { Author, IReviewsResponse } from '@/modules/vehicle-rent/constants';

class UserApi extends ApiService {
  public connectedAccountVerification(): Promise<IVerificationResponseType> {
    return this.get<IVerificationResponseType>('api/vehicle-owner-connected-account-verification', null, null);
  }

  public driverLicenseVerification(): Promise<IVerificationResponseType> {
    return this.get<IVerificationResponseType>('api/customer-identity-verification', null, null);
  }

  public getConnectedAccountLoginLink(): Promise<IVerificationResponseType> {
    return this.get<IVerificationResponseType>('api/vehicle-owner-connected-account-login-link', null, null);
  }

  public login(req: LoginRequest): Promise<Response> {
    const body = JSON.stringify(req);
    const headers = {
      'Content-Type': 'application/json',
    };

    return this.post('api/login', body, headers);
  }

  public signUp(req: ISignUpType): Promise<Response> {
    const body = JSON.stringify(req);
    const headers = {
      'Content-Type': 'application/json',
    };

    return this.post('api/sign-up/start', body, headers);
  }

  public userUpdate(req: IUserUpdateType): Promise<Author> {
    const body = JSON.stringify(req);
    const headers = {
      'Content-Type': 'application/json',
    };

    return this.put('api/user-update', body, headers);
  }

  public async fetchReviews(currentPage: number, reviewsPerPage: number): Promise<IReviewsResponse> {
    const endpoint = `api/ratings-reviews?ratingType=vehicle&page=${currentPage}&per_page=${reviewsPerPage}`;
    return this.get<IReviewsResponse>(endpoint);
  }
}

export const userApi = new UserApi();
