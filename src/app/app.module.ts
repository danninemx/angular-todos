import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoryBarComponent } from './category-bar/category-bar.component';
import { TodoPanelComponent } from './todo-panel/todo-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    CategoryBarComponent,
    TodoPanelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
