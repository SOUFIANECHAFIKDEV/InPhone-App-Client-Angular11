import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UsersComponent } from './pages/users/users.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { UserAddEditComponent } from './pages/user-add-edit/user-add-edit.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { IndexComponent } from './pages/index/index.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { QRCodeModule } from 'angularx-qrcode';
import { NgxVcardModule } from "ngx-vcard";
import { ClipboardModule } from 'ngx-clipboard';
import { NavComponent } from './components/nav/nav.component';
import { PopoverModule } from 'ngx-bootstrap/popover';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    UserFormComponent,
    UserAddEditComponent,
    NotFoundComponent,
    IndexComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    CarouselModule.forRoot(),
    FormsModule, 
    ReactiveFormsModule,
    QRCodeModule,
    NgxVcardModule,
    ClipboardModule,
    PopoverModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
