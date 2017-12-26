import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { ListPage } from '../pages/list/list';

import { AboutPage } from '../pages/about/about';
import { AnimePage } from '../pages/anime/anime';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { SeriesPage } from '../pages/series/series';
import { AllPelisPage } from '../pages/allpelis/allpelis';
import { AllSeriesPage } from '../pages/allseries/allseries';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    //MyApp,
    //HomePage,
    ListPage,
    MyApp,
    AboutPage,
    AnimePage,
    HomePage,
    TabsPage,
    SeriesPage,
    AllPelisPage,
    AllSeriesPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    //MyApp,
    //HomePage,
    ListPage,
    MyApp,
    AboutPage,
    AnimePage,
    HomePage,
    TabsPage,
    SeriesPage,
    AllPelisPage,
    AllSeriesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
