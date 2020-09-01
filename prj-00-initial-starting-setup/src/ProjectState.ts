import Project from './Project';
import { Listener } from './types';
import { ProjectStatus } from './enums';

class ProjectState {
    private listeners: Listener[] = [];
    private projects: Project[] = [];
    private static instance: ProjectState;
  
    private constructor() {}
  
    addListener(listener: Listener) {
      this.listeners.push(listener);
    }
  
    addProject(title: string, description: string, peopleQty: number) {
      const newProject = new Project(
        Math.random().toString(),
        title,
        description,
        peopleQty,
        ProjectStatus.ACTIVE
      );
  
      this.projects.push(newProject);
  
      for (const listener of this.listeners) {
        listener([...this.projects]);
      }
    }
  
    static getInstance() {
      if (this.instance) {
        return this.instance;
      }
  
      this.instance = new ProjectState();
      return this.instance;
    }
  }

  export default ProjectState.getInstance();