import { isEmpty } from 'lodash';

interface IReviewFormErrors {
  rate: string;
  comment: string;
}

const validateReviewForm = (data: { rate: number; comment: string }): IReviewFormErrors => {
  const errors: IReviewFormErrors = {
    rate: '',
    comment: '',
  };

  if (!data.rate) {
    errors.rate = 'Rating is required.';
  }

  if (isEmpty(data.comment.trim())) {
    errors.comment = 'Comment is required.';
  } else if (data.comment.length < 5 || data.comment.length > 1000) {
    errors.comment = 'Comment must be between 5 and 1000 characters.';
  }

  return errors;
};

export default validateReviewForm;
