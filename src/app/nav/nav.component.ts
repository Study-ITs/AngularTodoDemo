import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Project {
  id: number;
  name: string;
  sort_key: number;
}

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  @Input() projects: Project[] = [];
  @Output() projectSelected = new EventEmitter<number>();

  selectProject(projectId: number): void {
    this.projectSelected.emit(projectId);
  }
}
