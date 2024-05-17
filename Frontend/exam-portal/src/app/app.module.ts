import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatButtonModule} from '@angular/material/button';
import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { FooterComponent } from './Components/footer/footer.component';
import { SignupComponent } from './Pages/signup/signup.component';
import { LoginComponent } from './Pages/login/login.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { UserService } from './Services/user.service';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { HomeComponent } from './Pages/home/home.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { LoginService } from './Services/Login/login.service';
import { AuthInterceptorProviders } from './Services/auth.interceptor';
import { AdminDashboardComponent } from './Pages/Admin/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './Pages/Normal/user-dashboard/user-dashboard.component';
import { LocalStorageService } from './Services/localStorage.service';
import { ProfileComponent } from './Pages/profile/profile.component';
import { SideBarComponent } from './Pages/Admin/side-bar/side-bar.component';
import {MatListModule} from '@angular/material/list';
import { WelcomeComponent } from './Pages/Admin/welcome/welcome.component';
import {MatTableModule} from '@angular/material/table';
import { ViewCategoriesComponent } from './Pages/Admin/view-categories/view-categories.component';
import { AddCategoryComponent } from './Pages/Admin/add-category/add-category.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { ViewQuizzesComponent } from './Pages/Admin/view-quizzes/view-quizzes.component';
import { AddQuizComponent } from './Pages/Admin/add-quiz/add-quiz.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSelectModule} from '@angular/material/select';
import { UpdateQuizComponent } from './Pages/Admin/update-quiz/update-quiz.component';
import { ViewQuizQuestionsComponent } from './Pages/Admin/view-quiz-questions/view-quiz-questions.component';
import { AddQuestionComponent } from './Pages/Admin/add-question/add-question.component';
import { NormalUserSidebarComponent } from './Pages/Normal/normal-user-sidebar/normal-user-sidebar.component';
import { NormalUserWelcomeComponent } from './Pages/Normal/normal-user-welcome/normal-user-welcome.component';
import { LoadquizComponent } from './Pages/Normal/loadquiz/loadquiz.component';
import { InstructionsComponent } from './Pages/Normal/instructions/instructions.component';
import { StartComponent } from './Pages/Normal/start/start.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { NgxUiLoaderModule, NgxUiLoaderHttpModule } from "ngx-ui-loader";
// import { CKEditorModule } from '@ckeditor/ckeditor5-angular';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    AdminDashboardComponent,
    UserDashboardComponent,
    ProfileComponent,
    SideBarComponent,
    WelcomeComponent,
    ViewCategoriesComponent,
    AddCategoryComponent,
    ViewQuizzesComponent,
    AddQuizComponent,
    UpdateQuizComponent,
    ViewQuizQuestionsComponent,
    AddQuestionComponent,
    NormalUserSidebarComponent,
    NormalUserWelcomeComponent,
    LoadquizComponent,
    InstructionsComponent,
    StartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatExpansionModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    NgxUiLoaderModule,
    NgxUiLoaderHttpModule.forRoot({
      showForeground: true
    }),
    // CKEditorModule
    
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    UserService,
    LoginService,
    LocalStorageService,
    AuthInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
