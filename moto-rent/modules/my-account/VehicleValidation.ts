import Ajv from 'ajv';
import ajvErrors from 'ajv-errors';
import { IVehicleRequestType } from '../list-of-vehicles/constants';

const ajv = new Ajv({ allErrors: true });
ajvErrors(ajv);

const schema = {
  type: 'object',
  properties: {
    year: {
      type: 'number',
      minimum: 1,
    },
    make: {
      type: 'string',
      maxLength: 255,
      minLength: 1,
    },
    model: {
      type: 'string',
      maxLength: 255,
      minLength: 1,
    },
    seatHeight: {
      type: 'number',
      minimum: 1,
    },
    weight: {
      type: 'number',
      minimum: 1,
    },
    engine: {
      type: 'number',
      minimum: 1,
    },
    vinNumber: {
      type: 'string',
      maxLength: 255,
      minLength: 1,
    },
    description: {
      type: 'string',
      maxLength: 2000,
      minLength: 1,
    },
    oneThreeDaysPrice: {
      type: 'number',
      minimum: 1,
    },
    fourSevenDaysPrice: {
      type: 'number',
      minimum: 1,
    },
    eightFourteenDaysPrice: {
      type: 'number',
      minimum: 1,
    },
    fifteenThirtyDaysPrice: {
      type: 'number',
      minimum: 1,
    },
    monthOrMoreDaysPrice: {
      type: 'number',
      minimum: 1,
    },
    addresses: {
      type: 'array',
      items: {
        type: 'object',
      },
      minItems: 1,
    },
    unavailableDates: {
      type: 'array',
      items: { type: 'object' },
    },
    dailyMileageLimit: {
      type: 'number',
      minimum: 1,
    },
    overageFeePerExtraMile: {
      type: 'number',
      minimum: 1,
    },
    imageBagUuids: {
      type: 'array',
      maxItems: 10,
      minItems: 5,
      items: {
        type: 'object',
        properties: {
          originalImage: { type: 'object' },
          croppedImage: { type: 'object' },
        },
      },
    },
  },
  required: [
    'year',
    'make',
    'model',
    'seatHeight',
    'weight',
    'engine',
    'vinNumber',
    'description',
    'oneThreeDaysPrice',
    'fourSevenDaysPrice',
    'eightFourteenDaysPrice',
    'fifteenThirtyDaysPrice',
    'monthOrMoreDaysPrice',
    'addresses',
    'unavailableDates',
    'dailyMileageLimit',
    'overageFeePerExtraMile',
    'imageBagUuids',
  ],
  errorMessage: {
    properties: {
      year: 'Year is required',
      make: 'Make is required and must be between 1 and 255 characters',
      model: 'Model is required and must be between 1 and 255 characters',
      seatHeight: 'Seat Height is required',
      weight: 'Weight is required',
      engine: 'Engine is required',
      vinNumber: 'VIN Number is required and must be between 1 and 255 characters',
      description: 'Description is required and must be between 1 and 2000 characters',
      oneThreeDaysPrice: 'Price for 1-3 days is required',
      fourSevenDaysPrice: 'Price for 4-7 days is required',
      eightFourteenDaysPrice: 'Price for 8-14 days is required',
      fifteenThirtyDaysPrice: 'Price for 15-30 days is required',
      monthOrMoreDaysPrice: 'Price for a month or more is required',
      addresses: 'Pick Up Location is required',
      unavailableDates: 'Unavailable Dates are required',
      dailyMileageLimit: 'Daily Mileage Limit is required',
      overageFeePerExtraMile: 'Overage Fee Per Extra Mile is required',
      imageBagUuids: 'Images are required and must be between 5 and 10 items',
    },
    required: {
      addresses: 'Pick Up Location is required',
      imageBagUuids: 'Images are required and must be between 5 and 10 items',
    },
  },
};

const validate = ajv.compile(schema);

const validateVehicleForm = (model: IVehicleRequestType): Record<string, string> => {
  const valid = validate(model);
  const errors = {} as { [key: string]: string };

  if (!valid && validate.errors) {
    validate.errors.forEach(err => {
      let field = err.instancePath.slice(1);

      if (!field && err.params && 'missingProperty' in err.params) {
        field = err.params.missingProperty;
      }

      if (!field && err.params && 'errors' in err.params && Array.isArray(err.params.errors) && err.params.errors[0]?.params?.missingProperty) {
        field = err.params.errors[0].params.missingProperty;
      }

      const message = err.message || 'Invalid value';

      if (!errors[field]) {
        errors[field] = '';
      }
      errors[field] = (message);
    });
  }

  return errors;
};

export default validateVehicleForm;
