import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class TraduccionService {
  constructor(private translate: TranslateService) {}

  setLanguage(language: string) {
    this.translate.use(language);
    let tmdbLanguage = language;
    if (language === 'es') {
      tmdbLanguage = 'es-ES';
    } else if (language === 'en') {
      tmdbLanguage = 'en-US';
    }
    localStorage.setItem('language', language);
    localStorage.setItem('tmdbLanguage', tmdbLanguage);
  }

  getDefaultLanguage() {
    return localStorage.getItem('language') || 'es';
  }

  getTmdbLanguage() {
    return localStorage.getItem('tmdbLanguage') || 'es-ES';
  }
}
