import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoComponent } from '../todo/todo.component';

@Component({
  selector: 'app-todolist',
  standalone: true,
  imports: [CommonModule, TodoComponent],
  templateUrl: './todolist.component.html',
  styleUrl: './todolist.component.css'
})
export class TodolistComponent {
  items = [
    { id: 1, title: 'やること アイテム1', status: 'Active' },
    { id: 2, title: 'やること アイテム2', status: 'Inactive' },
    { id: 3, title: 'やること アイテム3', status: 'Pending' },
    { id: 4, title: 'やること アイテム4', status: 'Active' }
  ];
}
