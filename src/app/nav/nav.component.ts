import { Component, Input, Output, EventEmitter, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { ProjectService } from '../project.service';

export interface Project {
  id: number;
  name: string;
  sort_key: number;
}

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, MatListModule, MatIconModule, FormsModule],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  @Input() projects: Project[] = [];
  selectedProjectId: number | null = null;
  newProjectName: string = 'プロジェクト';
  isAddingProject: boolean = false;

  @Output() projectSelected = new EventEmitter<number>();

  @ViewChild('newProjectInput', { static: false }) newProjectInput!: ElementRef;

  constructor(
    private projectService: ProjectService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.projectService.selectedProjectId$.subscribe(projectId => {
      this.selectedProjectId = projectId;
    });
  }

  selectProject(projectId: number): void {
    this.projectSelected.emit(projectId);
    this.projectService.setSelectedProjectId(projectId);
  }

  startAddingProject(): void {
    this.isAddingProject = true;
    setTimeout(() => {
      if (this.newProjectInput) {
        this.renderer.selectRootElement(this.newProjectInput.nativeElement).focus();
      }
    }, 0); // フォーカスを設定
  }

  addProject(): void {
    if (this.newProjectName.trim()) {
      const newProject: Project = {
        id: this.projects.length + 1,
        name: this.newProjectName,
        sort_key: this.projects.length + 1
      };
      this.projects.push(newProject);
      this.projectService.addProject(newProject);
      this.isAddingProject = false;
      this.newProjectName = 'プロジェクト';
    }
  }

  onBlur(): void {
    if (this.isAddingProject) {
      this.addProject();
    }
  }
}
