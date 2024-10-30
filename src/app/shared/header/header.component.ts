import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(private translateService: TranslateService) { }
  language = this.translateService.getDefaultLang().toUpperCase();

  switchLanguage(language: string) {
    this.translateService.use(language);
    this.language = language.toUpperCase();
  }
}
