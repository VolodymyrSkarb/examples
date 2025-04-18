import React, { useEffect, useState } from 'react';
import ProjectCardComponent from './ProjectCardComponent/ProjectCardComponent';
import '../../styles/projects.scss';
import { useAppSelector } from '../../hooks/redux';
import { ProjectType } from '../../types/taskType';

const ProjectsListComponent: React.FC = () => {
  const { projects } = useAppSelector(state => state.projectsReducer);

  const [userProjects, setUserProjects] = useState(projects);

  useEffect(() => {
    setUserProjects(projects);
  }, [projects]);

  return (
    <div className="projects-container">
      {userProjects && userProjects.map((project: ProjectType) => (
        <ProjectCardComponent key={project.id} project={project} />
      ))}
    </div>
  );
};

export default ProjectsListComponent;
