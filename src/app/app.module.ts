import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './authentication/login/login.component';
import { FormsModule } from '@angular/forms';
import { ErrorComponent } from './error/error.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { NgbDateParserFormatter, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { NgbDateCustomParserFormatter } from './_shared/formatter/NgbDateCustomParserFormatter';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    LoginComponent,
    ErrorComponent,
    TodoListComponent,
    NavigationBarComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger'
    })
  ],
  providers: [
    {provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter}
  ],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule {
}
