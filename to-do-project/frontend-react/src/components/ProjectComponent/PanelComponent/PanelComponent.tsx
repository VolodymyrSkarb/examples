import React, { useEffect, useState } from 'react';
import { Draggable, Droppable, DroppableProvided } from 'react-beautiful-dnd';
import TaskComponent from '../TaskComponent/TaskComponent';
import { BoardType, EModalTypes, ICreatePanelFormField, ICreateTaskFormField, TaskItemType } from '../../../types/taskType';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Menu, MenuItem } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ModalComponent from '../../ModalComponent/ModalComponent';
import AlertDialog from '../../DialogComponent/AlertDialogComponent';
import ApiService from '../../../api';
import { useAppSelector } from '../../../hooks/redux';

const PanelComponent = ({ currentPanel, index, deletePanel }: { currentPanel: BoardType, index: number, deletePanel: Function }) => {
  const [panel] = useState<BoardType>(currentPanel);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [stateModal, setStateModal] = useState<boolean>(false);
  const [stateDialog, setStateDialog] = useState<boolean>(false);
  const [allowToConfirm, setAllowToConfirm] = useState<boolean>(false);
  const [panelName, setPanelName] = useState<string>('');
  const [actionType, setActionType] = useState<string>('');
  const [dialogText, setDialogText] = useState<string>('');
  const [tasksList, setTasksList] = useState<TaskItemType[]>(panel.taskItem);
  const open = Boolean(anchorEl);
  const { user } = useAppSelector(state => state.userReducer);

  const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const addNewTask = async (value: ICreateTaskFormField): Promise<void> => {
    if (user) {
      const addedTask = await ApiService.createTaskItem({ name:value.nameField, description: value.descriptionField, tasksBoardId: panel.id, creatorUserId: user.id });
      tasksList.push(addedTask);
      setStateModal(false);
    }
  };

  const renamePanel = async (value: ICreatePanelFormField): Promise<void> => {
    const newPanel = await ApiService.updateTasksBoard({name: value.nameField, id: panel.id});
    panel.name = newPanel.name;
    setStateModal(false);
  };

  const deleteTask = (index: number): void => {
    let left = tasksList.slice(0, index);
    let right = tasksList.slice(index + 1);
    setTasksList([...left, ...right]);
  };

  const actionWithItem = (value: ICreateTaskFormField | ICreatePanelFormField): void => {
    if (actionType === EModalTypes.ADD_TASK_MODE) {
      addNewTask(value as ICreateTaskFormField);

      return;
    }

    renamePanel(value);
  };

  const handleModalState = (): void => {
    handleClose();
    stateModal ? setStateModal(false) : setStateModal(true);
  };

  const handleDialogState = (): void => {
    handleClose();
    stateDialog ? setStateDialog(false) : setStateDialog(true);
  };

  const openModal = (modalMode: string): void => {
    setActionType(modalMode);
    setPanelName(modalMode === EModalTypes.RENAME_PANEL_MODE ? panel.name : '');
    handleModalState();
  };

  const openConfirmDialog = (modalMode: string): void => {
    setActionType(modalMode);

    if (panel.taskItem.length > 0) {
      setDialogText('It is impossible to delete a panel if it contains tasks. To get started, transfer to another panel or delete tasks');
      setAllowToConfirm(false);
    } else {
      setDialogText('Do you really want to delete this panel?');
      setAllowToConfirm(true);
    }
    handleDialogState();
  };

  const confirmDialog = async (): Promise<void> => {
    await ApiService.deleteTasksBoard(panel.id);
    deletePanel(index);
    setStateModal(false);
  };

  useEffect(() => {
    panel.taskItem = tasksList;
  }, [tasksList, panel]);

  return (
    <Draggable
      draggableId={panel.id}
      index={index}
    >
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className='board_panel'
          // style={{
          //   ...provided.draggableProps.style,
          //   opacity: snapshot.isDragging ? '0.5' : '1',
          // }}
        >
          <div className='board_panel__info'>
            <div className='board_panel__title'>
              <p className="board_panel__title__name">{panel.name}</p>
              <p className="board_panel__title__count">({tasksList.length})</p>
            </div>
            <div className='board_panel__menu'>
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
                <MenuItem onClick={() => openModal(EModalTypes.RENAME_PANEL_MODE)}>Rename Panel</MenuItem>
                <MenuItem onClick={() => openConfirmDialog(EModalTypes.DELETE_PANEL_MODE)}>Delete Panel</MenuItem>
                <MenuItem onClick={() => openModal(EModalTypes.ADD_TASK_MODE)}>Add Task</MenuItem>
              </Menu>
            </div>
            <div className='board_panel__dialog'>
              { stateModal && (
                <ModalComponent
                  modalState={stateModal}
                  switchModalState={handleModalState}
                  addNewItem={actionWithItem}
                  actionType={actionType}
                  name={panelName}
                  // description={}
                />
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
                    allowToConfirm={allowToConfirm}
                  />
                )
              }
            </div>
          </div>
          <Droppable
            type='QUOTE'
            droppableId={panel.id}
          >
            {(provided: DroppableProvided) => (
              <div
                {...provided.droppableProps}
                className='board_panel__content'
                ref={provided.innerRef}
              >
                {tasksList.map((task: TaskItemType, index: number) => (
                  <TaskComponent
                    currentTask={task}
                    currentIndex={index}
                    key={task.id}
                    deleteTask={deleteTask}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

export default PanelComponent;