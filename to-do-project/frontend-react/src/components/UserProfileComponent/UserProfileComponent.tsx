import React, { useState } from 'react';
import '../../styles/profile.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { EditNameForm } from '../Forms/FormsComponent';
import ApiService from '../../api';
import { updateUser } from '../../store/action-creator/user';
import {
  Backdrop,
  Fade,
  Modal,
  Tooltip,
} from '@mui/material';
import CropImageComponent from '../CropImageComponent/CropImageComponent';
import Box from '@mui/material/Box';
import { PhotoCamera } from '@mui/icons-material';
import image from '../../assets/profile-photo.png';

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

const UserProfileComponent: React.FC = () => {
  const { user } = useAppSelector(state => state.userReducer);
  const [editField, setEditField] = useState(null);
  const [open, setOpen] = useState(false);
  const [isDisplay, setIsDisplay] = useState(false);

  const dispatch = useAppDispatch();

  if (!user) {
      return null;
  }

  const handleEdit = (field: any) => {
    setEditField(field);
  };

  const handleCancelEdit = () => {
    setEditField(null);
  };

  const handleSubmitEdit = async (data: any) => {
    const updatedUser = await ApiService.updateUserInfo({...user, ...data});
    dispatch(updateUser(updatedUser));
    setEditField(null);
  };

  const handleFileInputChange = async (uploadImage: File) => {
    if (!user || !uploadImage) return;
    const formData = new FormData();
    formData.append('image', uploadImage);
    formData.append('id', String(user.id));

    const updatedUser = await ApiService.uploadUserAvatar(formData);
    dispatch(updateUser(updatedUser));
    setOpen(false);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleOpenModal = () => {
    setOpen(true);
  };

  const renderField = (field: 'firstName' | 'lastName' | 'position', label: string) => {
    const isEditing = editField === field;
    const fieldValue = user[field];

    return (
      <div className="user-info">
        <div className="user-info_title">{label}:</div>
        {isEditing ? (
          <EditNameForm
            fieldValue={fieldValue}
            field={field}
            submit={handleSubmitEdit}
            cancel={handleCancelEdit}
          />
        ) : (
          <Tooltip title="Edit" placement="bottom">
            <p className="user-info_text" onClick={() => handleEdit(field)}>
              {fieldValue}
            </p>
          </Tooltip>
        )}
      </div>
    );
  };

  return (
    <div className="container-info">
      <div className='avatar-container'>
        <img
          src={user.image ? `${process.env.REACT_APP_BASE_URL}/users/${user.id}/avatar/${user.image}` : image}
          alt='asd'
          className="avatar"
          onClick={handleOpenModal}
          onMouseEnter={()=>setIsDisplay(true)}
          onMouseLeave={()=>setIsDisplay(false)}
        />

        {
          isDisplay && (
            <PhotoCamera />
          )
        }
      </div>

      <div className='modal-wrapper'>
        <Modal
          className='modal'
          aria-labelledby='transition-modal-title'
          aria-describedby='transition-modal-description'
          open={open}
          onClose={handleCloseModal}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <p className='modal-title'>Upload Avatar</p>
              <CropImageComponent uploadImage={handleFileInputChange}/>
            </Box>
          </Fade>
        </Modal>
      </div>

      {renderField("firstName", "First Name")}
      {renderField("lastName", "Last Name")}
      {renderField("position", "Position")}
    </div>
  );
};

export default UserProfileComponent;