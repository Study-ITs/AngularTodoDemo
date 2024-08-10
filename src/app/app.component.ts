import { Component } from '@angular/core';
import { ProjectService } from './project.service'; 
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { NavComponent, Project } from './nav/nav.component';
import { TodolistComponent, Todo } from './todolist/todolist.component';
import { FormComponent } from './form/form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, NavComponent, TodolistComponent, FormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  todos: Todo[] = [];
  projects: Project[] = [];

  constructor(private projectService: ProjectService) {}

  title = 'angular-todo';

  ngOnInit(): void {
    this.fetchProjects();

    this.projectService.selectedProjectId$.subscribe(projectId => {
      if (projectId !== null) {
        this.fetchTodos(projectId);
      }
    });
  }

  fetchTodos(projectId: number): void {
    fetch(`http://localhost:3000/todos/project/${projectId}`)
      .then(response => response.json())
      .then(data => {
        this.todos = data;
      })
      .catch(error => console.error('Error fetching todos:', error));
  }

  fetchProjects(): void {
    fetch('http://localhost:3000/projects')
      .then(response => response.json())
      .then(data => {
        this.projects = data;
        console.log(this.projects);
      })
      .catch(error => console.error('Error fetching projects:', error));
  }

  onProjectSelected(projectId: number | null): void {
    if (projectId !== null && projectId !== undefined) {
      this.fetchTodos(projectId);
    } else {
      console.error('Invalid projectId:', projectId);
    }
  }

  addTodoToList(todo: Todo) {
    this.todos.push(todo);
  }
}
