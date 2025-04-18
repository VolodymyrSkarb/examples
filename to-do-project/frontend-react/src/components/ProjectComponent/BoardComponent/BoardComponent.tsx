import { DragDropContext, DraggableLocation, Droppable, DropResult } from 'react-beautiful-dnd';
import React, { useState } from 'react';
import PanelComponent from '../PanelComponent/PanelComponent';
import { BoardType, EModalTypes, ICreatePanelFormField, ProjectType } from '../../../types/taskType';

import { styled } from '@mui/material/styles';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import ViewListRoundedIcon from '@mui/icons-material/ViewListRounded';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import ModalComponent from '../../ModalComponent/ModalComponent';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { updateUserProject } from '../../../store/action-creator/projects';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import ApiService from '../../../api';

const ToggleButtons = styled(ToggleButtonGroup)(({ theme }) => ({
  '&.MuiToggleButtonGroup-root': {
    backgroundColor: '#FFF',
    '& .MuiToggleButtonGroup-grouped': {
      margin: 0,
      border: 0,
      '&.Mui-disabled': {
        border: 0,
      },
      '&:not(:first-of-type)': {
        borderRadius: theme.shape.borderRadius,
      },
      '&:first-of-type': {
        borderRadius: theme.shape.borderRadius,
      },
    },
  },
}));

const BoardComponent = ({ project }: { project: ProjectType }) => {
  const [boards, setBoards] = useState<Array<BoardType>>(project.tasksBoard || []);
  const [alignment, setAlignment] = useState<string>('left');
  const [stateModal, setStateModal] = useState<boolean>(false);
  const { user } = useAppSelector(state => state.userReducer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const board = Array.from(boards);

  const selectedView = (event: React.MouseEvent<HTMLElement>, newAlignment: any,) => {
    setAlignment((prevState) => {
      if (prevState && prevState === newAlignment) return;
      
return newAlignment;
    });
  };

  const findPanel = (panelId: string) => {
    return board.find((item: BoardType) => item.id === panelId);
  };

  // const spliceElements = (source: TaskItemType[]|BoardType[], position: number, deleteCount: number, insertElem: TaskItemType|BoardType) => {
  //   if (insertElem !== null) {
  //     return source.splice(position, deleteCount, insertElem);
  //   }
  // }

  const changeOrderTaskInSamePanel = async (source: DraggableLocation, destination: DraggableLocation): Promise<void> => {
    const panel = findPanel(source.droppableId);

    if (panel) {
      const [selectedTask] = panel.taskItem.splice(source.index, 1);
      panel.taskItem.splice(destination.index, 0, selectedTask);

      setBoards(board);
      await ApiService.updateOrderTaskItem(panel);
    }
  };

  const changeOrderTaskInDiffPanel = async (source: DraggableLocation, destination: DraggableLocation): Promise<void> => {
    const risePanel = findPanel(source.droppableId);
    const dropPanel = findPanel(destination.droppableId);

    if (risePanel && dropPanel) {
      const [selectedTask] = risePanel.taskItem.splice(source.index, 1);
      dropPanel.taskItem.splice(destination.index, 0, selectedTask);
      setBoards(board);
      [risePanel, dropPanel].map(panel => ApiService.updateOrderTaskItem(panel));
    }
  };

  const changeOrderPanel = async (source: DraggableLocation, destination: DraggableLocation): Promise<void> => {
    const [selectedPanel] = board.splice(source.index, 1);

    if (destination) {
      board.splice(destination.index, 0, selectedPanel);
      setBoards(board);
      await ApiService.updateOrderTasksBoard(board);
    }
  };

  const onDragEnd = (result: DropResult): void => {
    const { source, destination } = result;

    if (!destination) return;

    if (result.type === 'PANEL') {
      changeOrderPanel(source, destination);

      return;
    }

    if (source.droppableId !== destination.droppableId) {
      changeOrderTaskInDiffPanel(source, destination);

      return;
    }

    changeOrderTaskInSamePanel(source, destination);
  };

  const handleModalState = (): void => {
    stateModal ? setStateModal(false) : setStateModal(true);
  };

  const addNewItem = async (value: ICreatePanelFormField): Promise<void> => {
    const addedBoard = await ApiService.createTasksBoard({projectId: project.id, name: value.nameField});
    board.push(addedBoard);
    setBoards(board);
    handleModalState();

    if (user) {
      dispatch(updateUserProject(user.id));
    }
  };

  const deletePanel = (index: number): void => {
    let left = board.slice(0, index);
    let right = board.slice(index + 1);
    setBoards([...left, ...right]);

    if (user) {
      dispatch(updateUserProject(user.id));
    }
  };

  const goBack = (): void => navigate('/projects');

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable
        type='PANEL'
        direction='horizontal'
        droppableId='column'
      >
        {(provided) => (
          <div {...provided.droppableProps}
               ref={provided.innerRef}
          >
            <div className="actions-wrapper">
              <div className="info">
                <Button size='medium' variant="contained" className="button-back" onClick={goBack}><ArrowBackIcon/>Back</Button>
                <p className="project-name">{project.name}</p>
              </div>
              <Button onClick={handleModalState} size="large" variant="contained" className="add-panel-button" startIcon={<AddIcon />} />
            </div>
            <div className='switch-view'>
              {boards.length > 0 && (
                <ToggleButtons
                  size="small"
                  value={alignment}
                  exclusive
                  onChange={selectedView}
                  aria-label="text alignment"
                >
                  <ToggleButton value="left" aria-label="left aligned">
                    <ViewListRoundedIcon />
                  </ToggleButton>
                  <ToggleButton value="center" aria-label="centered">
                    <GridViewRoundedIcon />
                  </ToggleButton>
                </ToggleButtons>
              )}
            </div>
            <div className={`board ${boards.length === 0 ? "empty" : ""}`}>
              {boards.length > 0 ? (
                boards.map((panel, index) => (
                  <PanelComponent
                    currentPanel={panel}
                    key={panel.name}
                    index={index}
                    deletePanel={deletePanel}
                  />
                ))
              ) : (
                <div className="empty-message">
                  <p>Empty Boards</p>
                </div>
              )}
            </div>

            <ModalComponent modalState={stateModal} switchModalState={handleModalState} addNewItem={addNewItem} actionType={EModalTypes.ADD_PANEL_MODE}/>

            {provided.placeholder}
          </div >
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default BoardComponent;