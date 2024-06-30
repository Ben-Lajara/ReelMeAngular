import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-profile-card',
  templateUrl: './about-profile-card.component.html',
  styleUrl: './about-profile-card.component.css',
})
export class AboutProfileCardComponent implements OnInit {
  @Input() datos: any;
  @Input() username: any;
  ngOnInit(): void {}
  getColor(rango: string): string {
    switch (rango) {
      case 'BRONCE':
        return '#cd7f32';
      case 'PLATA':
        return '#c0c0c0';
      case 'ORO':
        return '#ffd700';
      default:
        return '#000000';
    }
  }
}
