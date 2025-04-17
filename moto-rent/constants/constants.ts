export interface IViolationErrorType {
  propertyPath: string;
  title: string;
}

export interface IViolationsErrorType {
  violations: IViolationErrorType[];
}

export interface IExceptionErrorType {
  message: string;
}

export interface IDetailsErrorType {
  violations: IViolationsErrorType;
  exception?: IExceptionErrorType;
  reason?: string;
  propertyPath: string;
}

export interface IErrorType {
  statusCode: number;
  type: string;
  title: string;
  details: IDetailsErrorType;
}

export const DEFAULT_PROFILE_IMAGE = '/assets/images/user-avatar.png';

export const SLIDER_REVIEW_BREAKPOINTS = {
  991: {
    slidesPerView: 3,
  },
  768: {
    slidesPerView: 2,
  },
  567: {
    slidesPerView: 1,
  },
};
