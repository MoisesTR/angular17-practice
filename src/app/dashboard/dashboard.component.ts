import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SideMenuComponent } from '@shared/side-menu/side-menu.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterModule,
    SideMenuComponent,
  ],
  templateUrl: './dashboard.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
})
export default class DashboardComponent { }
