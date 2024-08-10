import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ProjectService } from '../project.service';
import { TodolistComponent, Todo } from '../todolist/todolist.component';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule, MatInputModule, MatButtonModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  newTodoTitle = '';
  nextId = 5;
  selectedProjectId: number | null = null; 

  @Output() add = new EventEmitter<Todo>();

  constructor(private projectService: ProjectService) {} 

  ngOnInit(): void {
    this.projectService.selectedProjectId$.subscribe(projectId => {
      this.selectedProjectId = projectId;
    });
  }

  addTodo(): void {
    if (this.newTodoTitle.trim() === '') return;

    this.add.emit({
      id: this.nextId++,
      project_id: this.selectedProjectId as number,
      status_id: 1,
      priority_id: 1,
      title: this.newTodoTitle,
      start_date_time: '',
      end_date_time: ''
    });

    this.newTodoTitle = '';
  }
}
