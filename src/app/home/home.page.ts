// Angular
import { Component} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  currentYear = new Date().getFullYear();
  start: number;
  end: number;
  showScrollTop: Boolean = false;
  showSkeleton: Boolean = true;
  iconView = 'apps';
  constructor() {}

}
