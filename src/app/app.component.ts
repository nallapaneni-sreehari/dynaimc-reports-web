import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule} from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatSidenavModule, MatButtonModule, MatToolbarModule, MatIconModule, FormsModule, ReactiveFormsModule, CommonModule, MatMenuModule, MatListModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'dynaimc-reports-web';

  btnClass = 'px-4 py-2 bg-white text-black rounded-md text-md hover:scale-95 transition ease-in-out duration-300'

  sideNavWidth: number = 100;
  isExpanded: boolean = true;
  // drawer = { opened: true };

  toggleDrawer() {
    // Toggle the side nav width and expanded state when the button is clicked
    this.isExpanded = !this.isExpanded;

    if (this.isExpanded) {
      this.sideNavWidth = 250;
      // this.drawer.opened = true;
    } else {
      this.sideNavWidth = 70;
      // this.drawer.opened = false;
    }
  }
}
