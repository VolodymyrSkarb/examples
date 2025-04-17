import Ajv from 'ajv';
import ajvErrors from 'ajv-errors';
import addFormats from 'ajv-formats';
import { IUserUpdateType } from '@/modules/my-account/constants';

const ajv = new Ajv({ allErrors: true });
ajvErrors(ajv);
addFormats(ajv);

const schema = {
  type: 'object',
  properties: {
    firstName: {
      type: 'string',
      maxLength: 50,
      minLength: 2,
      pattern: "^[A-Z][a-zA-Z'\\- ]*$",
    },
    lastName: {
      type: 'string',
      maxLength: 50,
      minLength: 2,
      pattern: "^[A-Z][a-zA-Z'\\- ]*$",
    },
  },
  required: ['firstName', 'lastName'],
  errorMessage: {
    properties: {
      firstName: 'First Name is required and must be between 2 and 50 characters, start with an uppercase letter, and contain only letters and common symbols',
      lastName: 'Last Name is required and must be between 2 and 50 characters, start with an uppercase letter, and contain only letters and common symbols',
    },
  },
};

const validate = ajv.compile(schema);

const validateUpdateUser = (model: IUserUpdateType): Record<string, string> => {
  const valid = validate(model);
  const errors = {} as { [key: string]: string };

  if (!valid && validate.errors) {
    validate.errors.forEach(err => {
      let field = err.instancePath.slice(1);

      if (!field && err.params?.missingProperty) {
        field = err.params.missingProperty;
      }

      if (!field && err.params?.errors?.[0]?.params?.missingProperty) {
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

export default validateUpdateUser;
