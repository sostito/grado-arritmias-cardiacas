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
import { AccumulationChartAllModule, ChartAllModule, RangeNavigatorAllModule } from '@syncfusion/ej2-angular-charts';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { NumericTextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { DropDownListAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { ResultComponent } from './components/result/result.component';
import { LoginComponent } from './components/login/login/login.component';
import { SinginComponent } from './components/login/singin/singin.component';
import { MainComponent } from './components/main/main.component';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AccountComponent } from './components/account/account.component';
import { StillLineComponent } from './components/graphics/still-line/still-line.component';

@NgModule({
  declarations: [
    AppComponent,
    LineComponent,
    NavbarComponent,
    ResultComponent,
    LoginComponent,
    SinginComponent,
    MainComponent,
    AccountComponent,
    StillLineComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ChartsModule,
    StoreModule.forRoot({ tasks: taskReducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
    }),
    ChartAllModule,
    RangeNavigatorAllModule,
    BrowserModule,
    ButtonModule,
    AccumulationChartAllModule,
    NumericTextBoxModule,
    DatePickerModule,
    DropDownListAllModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
