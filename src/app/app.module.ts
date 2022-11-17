import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatDialogModule} from '@angular/material/dialog';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuComponent } from './components/menu/menu.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { LoginComponent } from './components/forms/login/login.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';
import { RealizaReservaComponent } from './components/realiza-reserva/realiza-reserva.component';
import { RealizaPreguntaComponent } from './components/forms/realiza-pregunta/realiza-pregunta.component';
import { ModificaUsuarioComponent } from './components/forms/modifica-usuario/modifica-usuario.component';
import { AgregaProductoComponent } from './components/forms/agrega-producto/agrega-producto.component';
import { ProductosComponent } from './components/productos/productos.component';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ModalTemplateComponent } from './components/modal-template/modal-template.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSortModule } from '@angular/material/sort';
import { PreguntasComponent } from './components/preguntas/preguntas.component';
import { AvatarModule } from 'ngx-avatar';
import { MainComponent } from './components/main/main.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    RealizaReservaComponent,
    RealizaPreguntaComponent,
    ModificaUsuarioComponent,
    AgregaProductoComponent,
    ProductosComponent,
    ModalTemplateComponent,
    PreguntasComponent,
    MainComponent,
  ],
  imports: [
    MatFormFieldModule,
    MatDialogModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatSortModule,
    MatFormFieldModule,
    AvatarModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
