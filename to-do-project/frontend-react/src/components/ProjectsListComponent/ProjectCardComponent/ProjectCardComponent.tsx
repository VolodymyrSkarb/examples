import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { ProjectType } from '../../../types/taskType';
import { Link } from 'react-router-dom';
import ApiService from '../../../api';
import AlertDialog from '../../DialogComponent/AlertDialogComponent';
import { updateUserProject } from '../../../store/action-creator/projects';
import { Menu, MenuItem } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import IconButton from '@mui/material/IconButton';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';

const ProjectCardComponent = ({project}:{project: ProjectType}) => {
  const { user } = useAppSelector(state => state.userReducer);
  const [currentUser] = useState(user);
  const [userProject] = useState<ProjectType>(project);
  const [stateDialog, setStateDialog] = useState<boolean>(false);
  const [actionType, setActionType] = useState<string>('');
  const [dialogText, setDialogText] = useState<string>('');
  const [allowToConfirm, setAllowToConfirm] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const dispatch = useAppDispatch();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDialogState = (): void => {
    stateDialog ? setStateDialog(false) : setStateDialog(true);
  };

  const deleteProject = async (): Promise<void> => {
    await ApiService.deleteProject(userProject.id);
    if (currentUser) {
      dispatch(updateUserProject(currentUser.id));
    }
  };

  const openAlert = (): void => {
    handleClose();
    setActionType('Delete Project');
    if (project.tasksBoard.length > 0) {
      setDialogText('It is impossible to delete a project if it contains some panels.');
      setAllowToConfirm(false);
    } else {
      setDialogText('Do you really want to delete this project?');
      setAllowToConfirm(true);
    }
    handleDialogState();
  };

  return (
    <div className="project-item-card">
      <Box sx={{ width: 275 }}>
        <Card sx={{ border: 0, borderRadius: 2.5 }} variant="outlined">
          <CardContent>
            <div className="project-info">
              <Typography variant="h5" component="div">
                {userProject?.name}
              </Typography>
              <div dangerouslySetInnerHTML={{ __html: userProject?.description }} />
            </div>
            <div className="project-action">
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
                <MenuItem onClick={openAlert}>Delete Project</MenuItem>
                <MenuItem>
                  <Link to={`${project.id}/profile`} className='task-link'>Manage Project</Link>
                </MenuItem>
              </Menu>
            </div>
          </CardContent>
          <CardActions>
            <Button size="small" component={Link} to={`/projects/${project.id}`}>Open</Button>
          </CardActions>
        </Card>
        {
          stateDialog && (
            <AlertDialog
              dialogState={stateDialog}
              switchDialogState={handleDialogState}
              dialogText={dialogText}
              dialogTitle={actionType}
              allowToConfirm={allowToConfirm}
              confirmDialog={deleteProject}
            />
          )
        }
      </Box>
    </div>
  );
};

export default ProjectCardComponent;