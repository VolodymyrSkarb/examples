import {
  TYPE_VALIDATION_ERROR,
  TYPE_AUTH_ERROR,
  AUTH_ERROR_MSG,
  TYPE_BAD_REQUEST,
  TYPE_CONFLICT_ERROR,
  TYPE_REASONS_ERROR,
} from '@/constants/http';
import { showErrorToast } from '@/components/Notifications';
import { IErrorType, IViolationsErrorType } from '@/constants/constants';
const EMAIL = 'email';

const showValidationErrors = (errors: IViolationsErrorType): void => {
  if (errors.violations && Array.isArray(errors.violations)) {
    for (const error of errors.violations) {
      showErrorToast(`${error.propertyPath}: ${error.title}`);
    }
  }
};

export const showErrors = (data: IErrorType): void => {
  switch (data.type) {
    case TYPE_VALIDATION_ERROR:
      if (data.details.violations) {
        showValidationErrors(data.details.violations);
      }
      break;
    case TYPE_AUTH_ERROR:
      showErrorToast(AUTH_ERROR_MSG);
      break;
    case TYPE_BAD_REQUEST:
      if (data.details.reason === TYPE_REASONS_ERROR.WRONG_DATE_RANGE) {
        showErrorToast('There are unavailable dates in the gap, select other dates');
      }

      if (data.details.reason === TYPE_REASONS_ERROR.VEHICLE_OWNER_UNAVAILABLE_RENT_OWN_VEHICLE) {
        showErrorToast('Sorry, you can\'t rent your vehicle');
      }

      if (data.details.reason === TYPE_REASONS_ERROR.VEHICLE_RENT_UNPAID) {
        showErrorToast('The rent is not paid');
      }

      if (data.details.reason === TYPE_REASONS_ERROR.VEHICLE_RENT_REFUND) {
        showErrorToast('The rent is refunded');
      }

      if (data.details.reason === TYPE_REASONS_ERROR.VEHICLE_RENT_REFUND_PERIOD_END) {
        showErrorToast('The refund period has ended');
      }

      if (data.details.exception?.message) {
        showErrorToast(data.details.exception.message);
      }

      break;
    case TYPE_CONFLICT_ERROR:
      if (data.details.propertyPath === EMAIL) {
        showErrorToast('The user with this email already exists');
      }
      break;
    default:
      showErrorToast('Unknown error');
  }
};
