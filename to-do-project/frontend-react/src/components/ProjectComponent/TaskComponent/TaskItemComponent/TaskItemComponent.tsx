import React, { useEffect, useState } from 'react';
import ApiService from '../../../../api';
import { Link, useParams } from 'react-router-dom';
import { BoardType, ICreateProject, TaskItemType } from '../../../../types/taskType';
import '../../../../styles/task-item.scss';
import { Controller, useForm, useFormState } from 'react-hook-form';
import { TaskDescriptionValidation, TaskNameValidation } from '../../../../modules/validation';
import { FormControl, FormHelperText, MenuItem, Select, SelectChangeEvent, TextField, Tooltip } from '@mui/material';
import TextEditorComponent from '../../../TextEditorComponent/TextEditorComponent';
import Button from '@mui/material/Button';
import Moment from 'react-moment';
import { useAppSelector } from '../../../../hooks/redux';
import { IUser } from '../../../../types/userType';

interface ITaskName {
  nameField: string,
}

const TaskItemComponent: React.FC = ()=> {
  const {taskId} = useParams();
  const [taskItem, setTaskItem] = useState<TaskItemType>();
  const [isDescriptionEdit, setIsDescriptionEdit] = useState<boolean>(false);
  const [isNameEdit, setIsNameEdit] = useState<boolean>(false);
  const [creatorFullName, setCreatorFullName] = useState<string>('');
  const [updatedFullName, setUpdatedFullName] = useState<string>('');
  const [users, setUsers] = useState<IUser[]>([]);
  const [assignedUser, setAssignedUser] = useState('');
  const [changedPanel, setChangedPanel] = useState('');
  const [allPanels, setAllPanels] = useState<BoardType[]>([]);
  const { user } = useAppSelector(state => state.userReducer);

  const { control: descriptionControl, handleSubmit: descriptionHandleSubmit, setValue: setDescriptionValue } = useForm<ICreateProject, "descriptionField">({ mode: 'onSubmit', defaultValues: {descriptionField: taskItem?.description} });
  const { control: nameControl, handleSubmit: nameHandleSubmit, setValue: setNameValue } = useForm<ITaskName>({ mode: 'onSubmit', defaultValues: {nameField: taskItem?.name} });
  const { errors: descriptionError } = useFormState({ control: descriptionControl });
  const { errors: nameError } = useFormState({ control: nameControl });

  const updateTaskItem = async (updates: Partial<TaskItemType> | null = null) => {
    if (!taskItem || !user) return;
    const updatedTask = await ApiService.updateTaskItem({ ...taskItem, ...updates, updatedUserId: user.id });
    setTaskItem(updatedTask);
  };

  const saveName = async (data: ITaskName) => {
    await updateTaskItem({ name: data.nameField });
    setIsNameEdit(!isNameEdit);
  };

  const saveDescription = async (data: ICreateProject) => {
    await updateTaskItem({ description: data.descriptionField });
    setIsDescriptionEdit(!isDescriptionEdit);
  };

  const cancelChange = (fieldType: 'description' | 'name') => {
    if (!taskItem) return;

    if (fieldType === 'description') {
      setIsDescriptionEdit(!isDescriptionEdit);
      setDescriptionValue('descriptionField', taskItem.description);
    }

    if (fieldType === 'name') {
      setIsNameEdit(!isNameEdit);
      setNameValue('nameField', taskItem.name);
    }
  };

  const handleChangeAssignee = async (event: SelectChangeEvent) => {
    if (!taskId) return;

    await ApiService.assignTaskToUser({taskItemId: taskId, userId: Number(event.target.value)});
    await updateTaskItem();
    setAssignedUser(event.target.value);
  };

  const handleChangePanel = async (event: SelectChangeEvent) => {
    if (!taskItem) return;

    const taskPanel = allPanels.find(panel => panel.id === taskItem.tasksBoardId);
    const selectedPanel = allPanels.find(panel => panel.id === event.target.value);

    if (!taskPanel || !selectedPanel) return;

    const taskIndex = taskPanel.taskItem.findIndex(task => task.id === taskId);
    const [task] = taskPanel.taskItem.splice(taskIndex, 1);

    if (!task) return;

    await updateTaskItem();

    selectedPanel.taskItem.push(task);
    allPanels.forEach(panel => ApiService.updateOrderTaskItem(panel));

    setChangedPanel(event.target.value);
  };

  useEffect(() => {
    const loadTaskData = async () => {
      if (!taskId) {
        return;
      }

      const [task, allUsers] = await Promise.all([
        ApiService.getTaskItemById(taskId),
        ApiService.getAllUsers()
      ]) as [TaskItemType, IUser[]];

      const allPanels = await ApiService.getAllTasksPanelsByProject(task.tasksBoard.projectId);

      setTaskItem(task);
      setAllPanels(allPanels);
      setUsers(allUsers);
      setDescriptionValue('descriptionField', task.description);
      setNameValue('nameField', task.name);
      setCreatorFullName(`${task.creatorUser.firstName} ${task.creatorUser.lastName}`);
      setUpdatedFullName(task.updatedUser ? `${task.updatedUser.firstName} ${task.updatedUser.lastName}` : creatorFullName);
      setAssignedUser(task.users.length ? String(task.users[0].id) : '');
      setChangedPanel(task.tasksBoard.id);
    };

    loadTaskData();
  }, [taskId, setDescriptionValue, setNameValue, creatorFullName]);

  useEffect(() => {
    if (!taskItem) return;

    const { creatorUser, updatedUser } = taskItem;
    setCreatorFullName(`${creatorUser.firstName} ${creatorUser.lastName}`);
    setUpdatedFullName(updatedUser ? `${updatedUser.firstName} ${updatedUser.lastName}` : creatorFullName);
  }, [taskItem, creatorFullName]);

  return (
    <div>
      {taskItem && (
        <>
          <div className='bread-crumbs'>
            <Link to={`/projects/${taskItem.tasksBoard.projectId}`}>{taskItem.tasksBoard.project.name}</Link>
            <p>/{taskItem.name}</p>
          </div>
          <div className='actions-wrapper'>
            <div className='change-panel-select'>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }} size="small">
                <Select
                  defaultValue="none"
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={changedPanel}
                  displayEmpty
                  onChange={handleChangePanel}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {
                    allPanels && (
                      allPanels.map((panel: BoardType) => (
                        <MenuItem value={panel.id} key={panel.id}>{panel.name}</MenuItem>
                      ))
                    )
                  }
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="task-wrapper">
            <div className="task-info">
              <div className={`task-title ${!isNameEdit ? 'width-content' : ''}`}>
                {
                  !isNameEdit ? (
                      <Tooltip title="Edit" placement="bottom">
                        <p className="task-name" onClick={()=> {
                          setIsNameEdit(!isNameEdit);
                        }}>{taskItem.name}</p>
                      </Tooltip>
                  ) : (
                    <div className="task-title-form">
                      <Controller
                        control={nameControl}
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
                            error={!!nameError.nameField?.message}
                            helperText={nameError.nameField?.message}
                          />
                        )}
                      />
                      <div className="action-buttons">
                        <Button className='buttons_confirm'
                                variant='contained'
                                size='small'
                                onClick={nameHandleSubmit(saveName)}
                        >
                          Save
                        </Button>
                        <Button className='buttons_cancel'
                                variant='contained'
                                size='small'
                                onClick={() => cancelChange('name')}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )
                }
              </div>
              <div className="task-description">
                <p className="title-description-container">Description: </p>
                {
                  !isDescriptionEdit ? (
                    <Tooltip title="Edit" placement="bottom">
                      <div className={`${!isDescriptionEdit ? 'width-content' : ''}`} dangerouslySetInnerHTML={{ __html: taskItem.description }} onClick={()=> {
                        setIsDescriptionEdit(!isDescriptionEdit);
                      }}/>
                    </Tooltip>
                  ) : (
                    <div className='task-description-form'>
                      <div>
                        <Controller
                          control={descriptionControl}
                          name='descriptionField'
                          rules={TaskDescriptionValidation}
                          render={({ field }) => (
                            <div className={descriptionError.descriptionField ? 'error' : ''}>
                              <TextEditorComponent field={field} />
                            </div>
                          )}
                        />
                        <FormHelperText
                          error={!!descriptionError.descriptionField?.message}
                        >
                          {descriptionError.descriptionField?.message}
                        </FormHelperText>
                      </div>
                      <div className="action-buttons">
                        <Button className='buttons_confirm'
                                variant='contained'
                                size='small'
                                onClick={descriptionHandleSubmit(saveDescription)}
                        >
                          Save
                        </Button>
                        <Button className='buttons_cancel'
                                variant='contained'
                                size='small'
                                onClick={() => cancelChange('description')}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )
                }
              </div>
            </div>
            <div className="additional-info-wrapper">
              <div className="task-additional-info">
                <div className="people-container">
                  <p className="title-container">People</p>
                  <div className="category">
                    <div className="category-name">Assignee:</div>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }} size="small">
                      <Select
                        defaultValue="none"
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={assignedUser}
                        displayEmpty
                        onChange={handleChangeAssignee}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {
                          users && (
                            users.map((user: IUser) => (
                              <MenuItem value={user.id} key={user.id}>{`${user.firstName} ${user.lastName}`}</MenuItem>
                            ))
                          )
                        }
                      </Select>
                    </FormControl>
                  </div>
                  <div className="category">
                    <div className="category-name">Created:</div>
                    <div>{creatorFullName}</div>
                  </div>
                  <div className="category">
                    <div className="category-name">Updated:</div>
                    <div>{updatedFullName}</div>
                  </div>
                </div>

                <div className="date-container">
                  <p className="title-container">Date</p>
                  <div className="created-date">
                    <div className="category-name">Created:</div>
                    <Moment format="DD/MM/YYYY HH:mm">
                      {taskItem.createdAt}
                    </Moment>
                  </div>
                  <div className="updated-date">
                    <div className="category-name">Updated:</div>
                    <Moment format="DD/MM/YYYY HH:mm">
                      {taskItem.updatedAt}
                    </Moment>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </>
      )}
    </div>
  );
};

export default TaskItemComponent;