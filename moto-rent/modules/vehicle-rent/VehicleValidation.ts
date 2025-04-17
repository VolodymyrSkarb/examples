import Ajv from 'ajv';
import ajvErrors from 'ajv-errors';
import addKeywords from 'ajv-keywords';
import { IVehicleRentModelType } from '@/modules/vehicle-rent/constants';

const ajv = new Ajv({ allErrors: true });
ajvErrors(ajv);
addKeywords(ajv);

const rentSchema = {
  type: 'object',
  properties: {
    startDate: {
      type: 'string',
      maxLength: 255,
      minLength: 1,
    },
    endDate: {
      type: 'string',
      maxLength: 255,
      minLength: 1,
    },
    startTime: {
      type: 'string',
      maxLength: 255,
      minLength: 1,
    },
    endTime: {
      type: 'string',
      maxLength: 255,
      minLength: 1,
    },
    pickUpAddress: {
      type: 'number',
      minimum: 1,
    },
    dropOffAddress: {
      type: 'number',
      minimum: 1,
    },
  },
  required: [
    'startDate',
    'endDate',
    'startTime',
    'endTime',
    'pickUpAddress',
    'dropOffAddress',
  ],
  additionalProperties: false,
  errorMessage: {
    properties: {
      startDate: 'Invalid start date. Please enter a valid date',
      endDate: 'Invalid end date. Please enter a valid date',
      startTime: 'Invalid start time. Please enter a valid time',
      endTime: 'Invalid end time. Please enter a valid time',
      pickUpAddress: 'Invalid pick up address. Please enter a valid address',
      dropOffAddress: 'Invalid drop off address. Please enter a valid address',
    },
  },
};

const validate = ajv.compile(rentSchema);

const validateVehicleRentForm = (model: IVehicleRentModelType): Record<string, string> => {
  const valid = validate(model);
  const errors = {} as { [key: string]: string };

  if (!valid && validate.errors) {
    validate.errors.forEach(err => {
      const field = err.instancePath.slice(1);
      const message = err.message || 'Invalid value';

      if (!errors[field]) {
        errors[field] = '';
      }
      errors[field] = (message);
    });
  }

  return errors;
};

export default validateVehicleRentForm;
