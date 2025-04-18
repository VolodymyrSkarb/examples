import React, { useState } from 'react';
import {AddProjectForm} from '../Forms/FormsComponent';
import ApiService from '../../api';
import { ICreateProject } from '../../types/taskType';
import { useNavigate } from 'react-router-dom';
import { updateUserProject } from '../../store/action-creator/projects';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const AddProjectComponent: React.FC = () => {
  const { user } = useAppSelector(state => state.userReducer);
  const [currentUser] = useState(user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const addProject = async (data: ICreateProject): Promise<void> => {
    if (user) {
      const newProject = await ApiService.createProject({name: data.nameField, description: data.descriptionField, createdUserId: user.id});
      if (currentUser) {
        dispatch(updateUserProject(currentUser.id));
      }

      navigate(`/projects/${newProject.id}`);
    }
  };

  const goBack = (): void => navigate(-1);
  
return (
    <div className="add-project-form">
      <Button size='medium' variant="contained" className="button-back" onClick={goBack}><ArrowBackIcon/>Back</Button>

      <AddProjectForm addProject={addProject}/>
    </div>
  );
};

export default AddProjectComponent;