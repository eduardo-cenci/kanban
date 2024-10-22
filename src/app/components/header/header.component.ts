import { Component } from '@angular/core';

import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroSun, heroMoon } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIconComponent],
  viewProviders: [provideIcons({ heroSun, heroMoon })],
  templateUrl: './header.component.html',
  styles: ``,
})
export class HeaderComponent {
  protected isDarkMode!: boolean;

  constructor() {
    this.isDarkMode = true;
    this.updateTheme();
  }

  protected toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    this.updateTheme();
  }

  private updateTheme(): void {
    document.documentElement.dataset['theme'] = this.isDarkMode ? 'dark' : 'light';
  }
}
