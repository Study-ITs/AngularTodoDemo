import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Project {
  id: number;
  name: string;
  sort_key: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private selectedProjectIdSource = new BehaviorSubject<number>(1);

  selectedProjectId$ = this.selectedProjectIdSource.asObservable();

  private projects: Project[] = []; // プロジェクトリストのローカルキャッシュ

  setSelectedProjectId(projectId: number): void {
    this.selectedProjectIdSource.next(projectId);
  }

  getSelectedProjectId(): number {
    return this.selectedProjectIdSource.getValue();
  }

  getProjects(): Project[] {
    return this.projects; // ローカルキャッシュからプロジェクトリストを返す
  }

  addProject(newProject: Project): void {
    this.projects.push(newProject);
    // サーバーへプロジェクトを保存する処理
    fetch('http://localhost:3000/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newProject)
    }).then(response => {
      if (response.ok) {
        console.log('Project saved successfully');
      } else {
        console.error('Error saving project');
      }
    }).catch(error => console.error('Error:', error));
  }
}
