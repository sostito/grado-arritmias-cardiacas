import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { LineComponent } from './components/graphics/line/line.component';

// Charts
import { ChartsModule } from 'ng2-charts';

// NGRX
import { StoreModule } from '@ngrx/store';
import { taskReducer } from '../store/tasks.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  declarations: [
    AppComponent,
    LineComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ChartsModule,
    StoreModule.forRoot({ tasks: taskReducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
