import React, { useEffect, useState } from 'react';
import '../../styles/modal.scss';
import { Backdrop, Fade, FormControl, FormHelperText, Modal, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import TextEditorComponent from '../TextEditorComponent/TextEditorComponent';
import Button from '@mui/material/Button';
import { Controller, useForm, useFormState } from 'react-hook-form';
import { TaskDescriptionValidation, TaskNameValidation } from '../../modules/validation';
import { EModalTypes, ICreatePanelFormField, ICreateTaskFormField } from '../../types/taskType';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
};

const ModalComponent = ({
                                         modalState,
                                         switchModalState,
                                         addNewItem,
                                         actionType,
                                         name = '',
                                         description = '',
                                       }: {
  modalState: boolean,
  switchModalState: Function,
  addNewItem: Function,
  actionType: string
  name?: string,
  description?: string,
}) => {
  const [open, setOpen] = useState(modalState);
  const [modalTitle, setModalTitle] = useState<string>(actionType);
  const { control, handleSubmit, reset, setValue } = useForm<ICreateTaskFormField>({ mode: 'all' });
  const { errors, isValid } = useFormState({ control });

  const handleClose = (): void => {
    setOpen(false);
    switchModalState();
    reset();
  };

  const submitForm = (data: ICreateTaskFormField | ICreatePanelFormField): void => {
    addNewItem(data);
    reset();
    if (actionType === EModalTypes.RENAME_PANEL_MODE || actionType === EModalTypes.EDIT_TASK_MODE) {
      setValue('nameField', data.nameField);

     if ('descriptionField' in data) {
        setValue('descriptionField', data.descriptionField);
      }
    }
  };

  useEffect(() => {
    setOpen(modalState);
  }, [modalState]);

  useEffect(() => {
    setModalTitle(actionType);
  }, [actionType]);

  useEffect(() => {
    setValue('nameField', name);
  }, [name, setValue]);

  useEffect(() => {
    setValue('descriptionField', description);
  }, [description, setValue]);

  return (
    <div className='modal-wrapper'>
      <Modal
        className='modal'
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <p className='modal-title'>{modalTitle}</p>
            {
              modalTitle !== EModalTypes.DELETE_TASK_MODE && (
                <FormControl>
                  <Controller
                    control={control}
                    name='nameField'
                    rules={TaskNameValidation}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        className='modal-name'
                        onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => field.onChange(e)}
                        value={field.value}
                        label='Name*'
                        error={!!errors.nameField?.message}
                        helperText={errors.nameField?.message}
                      />
                    )}
                  />
                  {
                    (actionType === EModalTypes.ADD_TASK_MODE
                      || actionType === EModalTypes.EDIT_TASK_MODE)
                    && (
                      <div>
                        <Controller
                          control={control}
                          name='descriptionField'
                          // defaultValue=""
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
                    )
                  }
                </FormControl>
              )
            }
            <div className='modal-buttons'>
              <Button className='modal-buttons_confirm' variant='contained' size='medium' disabled={!isValid}
                      onClick={handleSubmit(submitForm)}>OK</Button>
              <Button className='modal-buttons_undo' variant='contained' size='medium'
                      onClick={handleClose}>Cancel</Button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default ModalComponent;