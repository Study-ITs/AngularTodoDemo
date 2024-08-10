import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private selectedProjectIdSource = new BehaviorSubject<number>(1);

  selectedProjectId$ = this.selectedProjectIdSource.asObservable();

  setSelectedProjectId(projectId: number): void {
    this.selectedProjectIdSource.next(projectId);
  }

  getSelectedProjectId(): number {
    return this.selectedProjectIdSource.getValue();
  }
}
