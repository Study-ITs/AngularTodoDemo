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
  editingProjectId: number | null = null; // プロジェクト名を編集中のID

  @Output() projectSelected = new EventEmitter<number>();

  @ViewChild('newProjectInput', { static: false }) newProjectInput!: ElementRef;
  @ViewChild('editProjectInput', { static: false }) editProjectInput!: ElementRef; // 編集用の入力フィールドを参照

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
    }, 0);
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
    } else if (this.editingProjectId !== null) {
      this.saveEditedProjectName();
    }
  }

  startEditingProject(project: Project): void {
    this.editingProjectId = project.id;
    this.newProjectName = project.name;
    setTimeout(() => {
      if (this.editProjectInput) {
        this.renderer.selectRootElement(this.editProjectInput.nativeElement).focus();
      }
    }, 0);
  }

  saveEditedProjectName(): void {
    if (this.newProjectName.trim() && this.editingProjectId !== null) {
      const project = this.projects.find(p => p.id === this.editingProjectId);
      if (project) {
        project.name = this.newProjectName;
        this.projectService.updateProject(project); // サービスを通してサーバーに変更を保存
      }
      this.editingProjectId = null;
      this.newProjectName = '';
    }
  }
}
