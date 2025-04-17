export const TYPE_VALIDATION_ERROR = 'validation_error';
export const TYPE_BAD_REQUEST = 'bad_request';
export const TYPE_AUTH_ERROR = 'authentication_error';
export const TYPE_CONFLICT_ERROR = 'conflict';

export const AUTH_ERROR_MSG = 'Authentication error: Invalid credentials.';

export const HTTP_NO_CONTENT = 204;
export const HTTP_OK = 200;
export const HTTP_CREATED = 201;

export enum TYPE_REASONS_ERROR {
  ALREADY_EXISTS_VIN = 'vehicle_with_win_number_already_exists',
  WRONG_DATE_RANGE = 'unavailable_date_range',
  VEHICLE_OWNER_UNAVAILABLE_RENT_OWN_VEHICLE = 'vehicle_owner_unavailable_rent_own_vehicle',
  VEHICLE_RENT_UNPAID = 'vehicle_rent_unpaid',
  VEHICLE_RENT_REFUND = 'vehicle_rent_refund',
  VEHICLE_RENT_REFUND_PERIOD_END = 'vehicle_rent_refund_period_end',
}
