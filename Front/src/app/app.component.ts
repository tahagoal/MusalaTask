import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core/lib/translate.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Front';

  // constructor(private translate: TranslateService) {
  //   translate.setDefaultLang('en');
  // }
}
