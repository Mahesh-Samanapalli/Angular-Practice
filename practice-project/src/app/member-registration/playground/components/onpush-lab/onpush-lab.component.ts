import { ChangeDetectionStrategy, Component } from '@angular/core';

interface TaskItem {
  id: number;
  title: string;
  done: boolean;
}

@Component({
  selector: 'app-onpush-lab',
  templateUrl: './onpush-lab.component.html',
  styleUrls: ['./onpush-lab.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OnPushLabComponent {
  nextId = 3;
  taskDraft = '';
  tasks: TaskItem[] = [
    { id: 1, title: 'Build reusable field component', done: false },
    { id: 2, title: 'Use trackBy for lists', done: true }
  ];

  addTask(): void {
    const title = this.taskDraft.trim();
    if (!title) {
      return;
    }

    this.tasks = [...this.tasks, { id: this.nextId++, title, done: false }];
    this.taskDraft = '';
  }

  toggleDone(taskId: number): void {
    this.tasks = this.tasks.map(task =>
      task.id === taskId ? { ...task, done: !task.done } : task
    );
  }

  trackByTask(_index: number, task: TaskItem): number {
    return task.id;
  }
}
