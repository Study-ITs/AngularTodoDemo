import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoComponent } from '../todo/todo.component';

export interface Todo {
  id: number;
  status_id: number;
  project_id: number;
  priority_id: number;
  title: string;
  start_date_time: string;
  end_date_time: string;
}

@Component({
  selector: 'app-todolist',
  standalone: true,
  imports: [CommonModule, TodoComponent],
  templateUrl: './todolist.component.html',
  styleUrl: './todolist.component.css'
})
export class TodolistComponent {
  @Input() todos: Todo[] = [];
}
