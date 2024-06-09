import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TraduccionService } from './traduccion.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ReelMe';
  constructor(
    private translate: TranslateService,
    private traduccionService: TraduccionService
  ) {
    const defaultLanguage = this.traduccionService.getDefaultLanguage();
    this.traduccionService.setLanguage(defaultLanguage);
  }

  switchLanguage(language: string) {
    this.traduccionService.setLanguage(language);
  }
}
