import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Todo } from '../todolist/todolist.component';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent {
  @Input() todo!: Todo;
  @Output() delete = new EventEmitter<void>();

  // toggleCompletion(): void {
  //   this.todo.completed = !this.todo.completed;
  // }

  deleteTodo(): void {
    this.delete.emit();
  }
}
