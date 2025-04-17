import Ajv from 'ajv';
import ajvErrors from 'ajv-errors';
import addFormats from 'ajv-formats';
import { ISignUpType } from '@/modules/sign-up-form/constants/constants';

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
    email: {
      type: 'string',
      format: 'email',
    },
    password: {
      type: 'string',
      pattern: '^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).+$',
      minLength: 8,
    },
  },
  required: ['firstName', 'lastName', 'email', 'password'],
  errorMessage: {
    properties: {
      firstName: 'First Name is required and must be between 2 and 50 characters, start with an uppercase letter, and contain only letters and common symbols',
      lastName: 'Last Name is required and must be between 2 and 50 characters, start with an uppercase letter, and contain only letters and common symbols',
      email: 'Invalid email format',
      password: 'Password must be at least 8 characters long, include 1 uppercase letter, 1 lowercase letter, 1 digit, and 1 special symbol',
    },
  },
};

const validate = ajv.compile(schema);

const validateSignUpForm = (model: ISignUpType): Record<string, string> => {
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

export default validateSignUpForm;
