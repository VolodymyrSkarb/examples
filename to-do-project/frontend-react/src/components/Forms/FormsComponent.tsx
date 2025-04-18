import { Controller, useForm, useFormState } from 'react-hook-form';
import { IAuthForm, ICreateProject, IRegistrationForm } from '../../types/taskType';
import { FormControl, FormHelperText, TextField } from '@mui/material';
import {
  ConfirmPasswordValidation,
  EmailValidation,
  PasswordValidation, TaskDescriptionValidation,
  TaskNameValidation,
} from '../../modules/validation';
import React from 'react';
import Button from '@mui/material/Button';
import TextEditorComponent from '../TextEditorComponent/TextEditorComponent';

export const AuthForm = ({submitForm, isLoading}:{submitForm: any, isLoading: boolean}) => {
  const { control, handleSubmit } = useForm<IAuthForm>({ mode: 'onSubmit', defaultValues: { emailField: '', passwordField: '' } });
  const { errors } = useFormState({ control });
  
return (
    <>
      <FormControl fullWidth>
        <Controller
          control={control}
          name='emailField'
          rules={EmailValidation}
          render={({ field }) => (
            <TextField
              {...field}
              margin="dense"
              // className='modal-name'
              onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => field.onChange(e)}
              value={field.value}
              label='Email'
              variant="filled"
              error={!!errors.emailField?.message}
              helperText={errors.emailField?.message}
            />
          )}
        />

        <Controller
          control={control}
          name='passwordField'
          rules={PasswordValidation}
          render={({ field }) => (
            <TextField
              {...field}
              margin="dense"
              // className='modal-name'
              onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => field.onChange(e)}
              value={field.value}
              label='Password'
              type="password"
              variant="filled"
              error={!!errors.passwordField?.message}
              helperText={errors.passwordField?.message}
            />
          )}
        />
      </FormControl>
      <Button className='buttons_confirm'
              variant='contained'
              size='large'
              fullWidth
              disabled={isLoading}
              onClick={handleSubmit(submitForm)}
      >
        SUBMIT
      </Button>
    </>
  );
};

export const RegistrationForm = ({submitRegistrationForm, isLoading}:{submitRegistrationForm: any, isLoading: boolean}) => {
  const { control, handleSubmit } = useForm<IRegistrationForm>({ mode: 'onSubmit', defaultValues: { emailField: '', passwordField: '', confirmPasswordField: '' } });
  const { errors } = useFormState({ control });
  
return (
    <>
      <FormControl fullWidth>
        <Controller
          control={control}
          name='emailField'
          rules={EmailValidation}
          render={({ field }) => (
            <TextField
              {...field}
              margin="dense"
              // className='modal-name'
              onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => field.onChange(e)}
              value={field.value}
              label='Email'
              variant="filled"
              error={!!errors.emailField?.message}
              helperText={errors.emailField?.message}
            />
          )}
        />

        <Controller
          control={control}
          name='passwordField'
          rules={PasswordValidation}
          render={({ field }) => (
            <TextField
              {...field}
              margin="dense"
              // className='modal-name'
              onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => field.onChange(e)}
              value={field.value}
              label='Password'
              type="password"
              variant="filled"
              error={!!errors.passwordField?.message}
              helperText={errors.passwordField?.message}
            />
          )}
        />
        <Controller
          control={control}
          name='confirmPasswordField'
          rules={ConfirmPasswordValidation}
          render={({ field }) => (
            <TextField
              {...field}
              margin="dense"
              // className='modal-name'
              onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => field.onChange(e)}
              value={field.value}
              label='Confirm Password'
              type="password"
              variant="filled"
              error={!!errors.confirmPasswordField?.message}
              helperText={errors.confirmPasswordField?.message}
            />
          )}
        />
      </FormControl>
      <Button className='buttons_confirm'
              variant='contained'
              size='large'
              fullWidth
              disabled={isLoading}
              onClick={handleSubmit(submitRegistrationForm)}
      >
        Registration
      </Button>
    </>
  );
};

export const AddProjectForm = ({addProject}: {addProject: any}) => {
  const { control, handleSubmit } = useForm<ICreateProject>({ mode: 'onSubmit', defaultValues: { nameField: '', descriptionField: '' } });
  const { errors } = useFormState({ control });

  return (
    <>
      <FormControl>
        <Controller
          control={control}
          name='nameField'
          rules={TaskNameValidation}
          render={({ field }) => (
            <TextField
              {...field}
              className='modal-name'
              onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => field.onChange(e)}
              value={field.value}
              label='Name*'
              error={!!errors.nameField?.message}
              helperText={errors.nameField?.message}
            />
          )}
        />
        <div>
          <Controller
            control={control}
            name='descriptionField'
            rules={TaskDescriptionValidation}
            render={({ field }) => (
              <div className={errors.descriptionField ? 'error' : ''}>
                <TextEditorComponent field={field} />
              </div>
            )}
          />
          <FormHelperText
            error={!!errors.descriptionField?.message}
          >
            {errors.descriptionField?.message}
          </FormHelperText>
        </div>
        <Button className='buttons_confirm'
                variant='contained'
                size='large'
                fullWidth
                onClick={handleSubmit(addProject)}
        >
          Add Project
        </Button>
      </FormControl>
    </>
    );
};

export interface IFields {
  firstName: string,
  lastNane: string,
  position: string,
}

export const EditNameForm = ({submit, cancel, fieldValue = '', field}: {submit: any, cancel: any, fieldValue: string, field: keyof IFields}) => {
  const { control, handleSubmit } = useForm<IFields>({ mode: 'onSubmit', defaultValues: { [field]: fieldValue } });
  const { errors } = useFormState({ control });

  return (
    <>
      <FormControl>
        <Controller
          control={control}
          name={field}
          rules={TaskNameValidation}
          render={({ field }) => (
            <TextField
              {...field}
              className='modal-name'
              onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => field.onChange(e)}
              value={field.value}
              margin="dense"
              size="small"
              error={!!errors[field.name as keyof IFields]?.message}
              helperText={errors[field.name as keyof IFields]?.message}
            />
          )}
        />
        <div className="action-buttons">
          <Button className='buttons_confirm'
                  variant='contained'
                  size='small'
                  // fullWidth
                  onClick={handleSubmit(submit)}
          >
            Save
          </Button>
          <Button className='buttons_cancel'
                  variant='contained'
                  size='small'
                  onClick={cancel}
          >
            Cancel
          </Button>
        </div>
      </FormControl>
    </>
  );
};
