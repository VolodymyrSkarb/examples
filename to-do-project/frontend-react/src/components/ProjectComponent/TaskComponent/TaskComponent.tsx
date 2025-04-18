import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { EModalTypes, ICreateTaskFormField, TaskItemType } from '../../../types/taskType';
import IconButton from '@mui/material/IconButton';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Avatar, AvatarGroup, Menu, MenuItem } from '@mui/material';
import ModalComponent from '../../ModalComponent/ModalComponent';
import AlertDialog from '../../DialogComponent/AlertDialogComponent';
import ApiService from '../../../api';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../hooks/redux';
import image from '../../../assets/profile-photo.png';
import { IUser } from '../../../types/userType';

const TaskComponent = ({ currentTask, currentIndex, deleteTask }: { currentTask: TaskItemType, currentIndex: number, deleteTask: Function }) => {
  const [task] = useState<TaskItemType>(currentTask);
  const [stateModal, setStateModal] = useState<boolean>(false);
  const [stateDialog, setStateDialog] = useState<boolean>(false);
  const [taskName, setTaskName] = useState<string>('');
  const [taskDescription, setTaskDescription] = useState<string>('');
  const [actionType, setActionType] = useState<string>('');
  const [dialogText, setDialogText] = useState<string>('');
  const index = currentIndex;
  const { user } = useAppSelector(state => state.userReducer);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleModalState = (): void => {
    handleClose();
    stateModal ? setStateModal(false) : setStateModal(true);
  };

  const handleDialogState = (): void => {
    handleClose();
    stateDialog ? setStateDialog(false) : setStateDialog(true);
  };

  const editTask = async (value: ICreateTaskFormField): Promise<void> => {
    if (user) {
      const updatedTask = await ApiService.updateTaskItem({ ...task, name: value.nameField, description: value.descriptionField, updatedUserId: user.id });
      task.name = updatedTask.name;
      task.description = updatedTask.description;
      setStateModal(false);
    }
  };

  const openModal = (modalMode: string): void => {
    setActionType(modalMode);
    handleModalState();

    if (modalMode !== EModalTypes.DELETE_TASK_MODE) {
      setTaskName(task.name);
      setTaskDescription(task.description);
    }
  };

  const openConfirmDialog = (modalMode: string): void => {
    setActionType(modalMode);
    setDialogText('Do you really want to delete this task?');
    handleDialogState();
  };

  const confirmDialog = async (): Promise<void> => {
    await ApiService.deleteTaskItem(task.id);
    deleteTask(index);
    setStateDialog(false);
  };

  return (
    <div>
      <Draggable
        key={task.id}
        draggableId={task.id}
        index={index}
      >
        {(provided, snapshot) => (
          <div
            className='task'
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div className="task-title">
              <div className='task-title-name'>
                <Link to={`task/${task.id}`} className='task-link'>{task.name}</Link>
              </div>
              <div className='task-title-menu'>
                <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={open ? 'account-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                >
                  <MoreHorizIcon fontSize="large" />
                </IconButton>
                <Menu
                  id="demo-positioned-menu"
                  aria-labelledby="demo-positioned-button"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem>
                    <Link to={`task/${task.id}`} className='task-link'>Open</Link>
                  </MenuItem>
                  <MenuItem onClick={() => openModal(EModalTypes.EDIT_TASK_MODE)}>Edit</MenuItem>
                  <MenuItem onClick={() => openConfirmDialog(EModalTypes.DELETE_TASK_MODE)}>Delete</MenuItem>
                </Menu>
              </div>
            </div>
            <div className='task-description' dangerouslySetInnerHTML={{ __html: task.description }} />
            <AvatarGroup total={task.users.length}>
              {
                task && task.users.map((user: IUser) => (
                  <Avatar
                    sx={{ width: 40, height: 40 }}
                    key={user.id}
                    alt={user.lastName}
                    src={user.image ? `${process.env.REACT_APP_BASE_URL}/users/${user.id}/avatar/${user.image}` : image} />
                ))
              }
            </AvatarGroup>

            <div>
              { stateModal && (
                <div>
                  <ModalComponent
                    modalState={stateModal}
                    switchModalState={handleModalState}
                    addNewItem={editTask}
                    actionType={actionType}
                    name={taskName}
                    description={taskDescription}
                  />
                </div>
              )
              }
              {
                stateDialog && (
                  <AlertDialog
                    dialogState={stateDialog}
                    switchDialogState={handleDialogState}
                    dialogText={dialogText}
                    dialogTitle={actionType}
                    confirmDialog={confirmDialog}
                  />
                )
              }
            </div>
          </div>
        )}
      </Draggable>
    </div>
  );
};

export default TaskComponent;