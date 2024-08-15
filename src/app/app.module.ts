import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { TasksComponent } from './views/tasks/tasks.component';
import { HomeComponent } from './views/home/home.component';
import { ContainerComponent } from './components/container/container.component';
import { PaperComponent } from './components/paper/paper.component';
import { CardTaskComponent } from './views/tasks/feature/card-task/card-task.component';
import { FormTaskComponent } from './views/tasks/feature/form-task/form-task.component';
import { PriorityService } from 'api/src/app/priority/priority.service';
import { StateService } from './services/state.service';
import { TaskService } from './services/task.service';
import { FormsModule } from '@angular/forms';
import { ModalTaskComponent } from './views/tasks/feature/modal-task/modal-task.component';
import { ChartComponent } from './views/dashboard/feature/chart/chart.component';
import { CardCountComponent } from './views/dashboard/feature/card-count/card-count.component';
import { NgxEchartsModule } from 'ngx-echarts';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    TasksComponent,
    HomeComponent,
    ContainerComponent,
    PaperComponent,
    CardTaskComponent,
    FormTaskComponent,
    ModalTaskComponent,
    ChartComponent,
    CardCountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    })
  ],
  providers: [
    PriorityService,
    StateService,
    TaskService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
