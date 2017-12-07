import { Component } from '@angular/core';

import { SeriesPage } from '../series/series';
import { AnimePage } from '../anime/anime';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = SeriesPage;
  tab3Root = AnimePage;

  constructor() {

  }
}
