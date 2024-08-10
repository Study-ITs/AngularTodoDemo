import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { ProjectService } from '../project.service';

export interface Project {
  id: number;
  name: string;
  sort_key: number;
}

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, MatListModule, MatIconModule],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  @Input() projects: Project[] = [];
  selectedProjectId: number | null = null;

  @Output() projectSelected = new EventEmitter<number>();

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.projectService.selectedProjectId$.subscribe(projectId => {
      this.selectedProjectId = projectId;
    });
  }

  selectProject(projectId: number): void {
    this.projectSelected.emit(projectId);
    this.projectService.setSelectedProjectId(projectId); // プロジェクトIDを状態に設定
  }
}
