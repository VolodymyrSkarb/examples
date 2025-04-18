const REQUIRED_FIELD = 'Required to fill';

export const TaskNameValidation = {
  required: REQUIRED_FIELD,
  // validate: (value: string) => {
  //   if (value.length < 5) {
  //     return 'Min length 5';
  //   }
  //
  //   return true;
  // }
};

export const TaskDescriptionValidation = {
  required: REQUIRED_FIELD,

  validate: (value: string) => {
    const regEx: RegExp = (/(<[^>]*>)/g);
    const description = value.replace(regEx, '');

    // if (description.length > 15) {
    //   return 'max length 15';
    // }

    if (description.length === 0) {
      return REQUIRED_FIELD;
    }

    return true;
  }
};

export const EmailValidation = {
  required: REQUIRED_FIELD,
  validate: (value: string) => {
    if (!/^\S+@\S+\.\S+$/.test(value)) {
      return 'Please enter a valid email address';
    }

    return true;
  }
};

export const PasswordValidation = {
  required: REQUIRED_FIELD,
  validate: (value: string, c: any) => {
    if (!/^[A-Za-z\d@$!%*#?&^_-]{8,}$/.test(value)) {
      return 'Password must be at least 8 characters long.';
    }

    return true;
  }
};

export const ConfirmPasswordValidation = {
  required: REQUIRED_FIELD,
  validate: (value: string, c: any) => {
    if (c.passwordField !== value) {
      return 'The passwords do not match';
    }

    return true;
  }
};