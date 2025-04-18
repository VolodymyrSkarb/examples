import React, { useEffect, useState } from 'react';
import '../../../styles/board.scss';
import BoardComponent from '../BoardComponent/BoardComponent';
import { ProjectType } from '../../../types/taskType';
import { useParams } from 'react-router-dom';
import ApiService from '../../../api';

const ProjectComponent: React.FC = () => {
  const [project, setProject] = useState<ProjectType>();
  const {id} = useParams();

  useEffect(() => {
    const loadProject = async (): Promise<void> => {
      if (id) {
        const currentProject = await ApiService.loadProjectById(id);
        setProject(currentProject);
      }
    };
    loadProject();
  }, [id]);

  return (
    <div>
      {project && project.tasksBoard &&(
        <BoardComponent project={project}/>
      )}
    </div>

  );
};

export default ProjectComponent;