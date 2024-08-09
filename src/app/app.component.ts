import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { NavComponent } from './nav/nav.component';
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
  todos: Todo[] = [
    { id: 1, title: 'やること アイテム1', status: 'Active' },
    { id: 2, title: 'やること アイテム2', status: 'Inactive' },
    { id: 3, title: 'やること アイテム3', status: 'Pending' },
    { id: 4, title: 'やること アイテム4', status: 'Active' }
  ];

  addTodoToList(todo: Todo) {
    this.todos.push(todo);
  }
  
  title = 'angular-todo';
}
