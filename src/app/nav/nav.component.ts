import { Component, Input, Output, EventEmitter, ElementRef, Renderer2, ViewChild, OnInit, OnDestroy } from '@angular/core';
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
export class NavComponent implements OnInit, OnDestroy {
  @Input() projects: Project[] = [];
  selectedProjectId: number | null = null;
  newProjectName: string = 'プロジェクト';
  isAddingProject: boolean = false;
  editingProjectId: number | null = null; // プロジェクト名を編集中のID
  activeMenuProjectId: number | null = null; // 現在アクティブなプロジェクトID

  @Output() projectSelected = new EventEmitter<number>();

  @ViewChild('newProjectInput', { static: false }) newProjectInput!: ElementRef;
  @ViewChild('editProjectInput', { static: false }) editProjectInput!: ElementRef;

  constructor(
    private projectService: ProjectService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.projectService.selectedProjectId$.subscribe(projectId => {
      this.selectedProjectId = projectId;
    });

    // ドキュメント全体のクリックイベントを監視
    document.addEventListener('click', this.closeMenuIfClickedOutside.bind(this));
  }

  ngOnDestroy(): void {
    // コンポーネントが破棄される際にイベントリスナーを解除
    document.removeEventListener('click', this.closeMenuIfClickedOutside.bind(this));
  }

  selectProject(projectId: number): void {
    this.projectSelected.emit(projectId);
    this.projectService.setSelectedProjectId(projectId);
  }

  startAddingProject(): void {
    this.isAddingProject = true;
    this.newProjectName = 'プロジェクト';
    this.editingProjectId = null;
    this.activeMenuProjectId = null;
    this.setFocus(this.newProjectInput);
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
      this.resetProjectInput();
    }
  }

  startEditingProject(event: Event, project: Project): void {
    event.stopPropagation(); // イベントの伝播を防ぐ
    this.editingProjectId = project.id;
    this.newProjectName = project.name;
    this.activeMenuProjectId = null; // メニューを閉じる

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
        this.projectService.updateProject(project);
        this.resetProjectInput();
      }
    }
  }

  deleteProject(event: Event, projectId: number): void {
    event.stopPropagation();
    this.projects = this.projects.filter(project => project.id !== projectId);
    this.projectService.deleteProject(projectId);
    this.activeMenuProjectId = null; // メニューを閉じる
  }

  toggleMenu(event: Event, projectId: number): void {
    event.stopPropagation(); // イベントの伝播を防ぐ
    this.activeMenuProjectId = this.activeMenuProjectId === projectId ? null : projectId;
  }

  closeMenuIfClickedOutside(event: Event): void {
    const targetElement = event.target as HTMLElement;
    if (
      this.activeMenuProjectId !== null &&
      !targetElement.closest('.menu-options') &&
      !targetElement.closest('.menu')
    ) {
      this.activeMenuProjectId = null;
    }
  }

  private resetProjectInput(): void {
    this.newProjectName = 'プロジェクト';
    this.isAddingProject = false;
    this.editingProjectId = null;
  }

  private setFocus(element: ElementRef): void {
    setTimeout(() => this.renderer.selectRootElement(element.nativeElement).focus(), 0);
  }
}
