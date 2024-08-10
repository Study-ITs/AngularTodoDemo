import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Project {
  id: number;
  name: string;
  sort_key: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private selectedProjectIdSource = new BehaviorSubject<number>(1);
  selectedProjectId$ = this.selectedProjectIdSource.asObservable();
  private projects: Project[] = [];

  setSelectedProjectId(projectId: number): void {
    this.selectedProjectIdSource.next(projectId);
  }

  getProjects(): Project[] {
    return this.projects;
  }

  loadProjects(): void {
    fetch('http://localhost:3000/projects')
      .then(response => response.json())
      .then(data => this.projects = data)
      .catch(console.error);
  }

  addProject(newProject: Project): void {
    this.projects.push(newProject);
    this.saveProject(newProject, 'POST');
  }

  updateProject(updatedProject: Project): void {
    const projectIndex = this.projects.findIndex(p => p.id === updatedProject.id);
    if (projectIndex !== -1) {
      this.projects[projectIndex] = updatedProject;
      this.saveProject(updatedProject, 'PUT');
    }
  }

  private saveProject(project: Project, method: 'POST' | 'PUT'): void {
    const url = method === 'POST' ? 'http://localhost:3000/projects' : `http://localhost:3000/projects/${project.id}`;
    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(project)
    }).then(response => response.ok ? console.log(`${method} successful`) : console.error(`${method} failed`))
      .catch(console.error);
  }
}
