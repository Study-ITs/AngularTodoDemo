import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { MatToolbarModule } from '@angular/material/toolbar';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  selectedProjectName: string | null = null;

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    setTimeout(() => {
      const initialProjectId = this.projectService.getSelectedProjectId();
      this.selectedProjectName = this.projectService.getProjectNameById(initialProjectId);
    }, 500);
    
    // プロジェクトが変更されたときの処理
    this.projectService.selectedProjectId$.subscribe(projectId => {
      this.selectedProjectName = this.projectService.getProjectNameById(projectId);
    });
  }
}
