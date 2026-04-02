import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-template-lab',
  templateUrl: './template-lab.component.html',
  styleUrls: ['./template-lab.component.css']
})
export class TemplateLabComponent implements OnInit {
  isLoading = true;
  members: string[] = [];
  showTips = false;

  ngOnInit(): void {
    setTimeout(() => {
      this.members = ['Asha', 'Ravi', 'Keerthi'];
      this.isLoading = false;
    }, 700);
  }

  toggleTips(): void {
    this.showTips = !this.showTips;
  }
}
