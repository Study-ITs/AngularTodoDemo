import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodolistComponent, Todo } from '../todolist/todolist.component';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  newTodoTitle = '';
  nextId = 5;

  @Output() add = new EventEmitter<Todo>();

  addTodo(): void {
    if (this.newTodoTitle.trim() === '') return;

    this.add.emit({
      id: this.nextId++,
      title: this.newTodoTitle,
      status: 'Active'
    });

    this.newTodoTitle = '';
  }
}
