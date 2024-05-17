import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './Pages/signup/signup.component';
import { HomeComponent } from './Pages/home/home.component';
import { LoginComponent } from './Pages/login/login.component';
import { AdminDashboardComponent } from './Pages/Admin/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './Pages/Normal/user-dashboard/user-dashboard.component';
import { adminGuard } from './Services/Guard/admin.guard';
import { normalGuard } from './Services/Guard/normal.guard';
import { ProfileComponent } from './Pages/profile/profile.component';
import { WelcomeComponent } from './Pages/Admin/welcome/welcome.component';
import { ViewCategoriesComponent } from './Pages/Admin/view-categories/view-categories.component';
import { AddCategoryComponent } from './Pages/Admin/add-category/add-category.component';
import { ViewQuizzesComponent } from './Pages/Admin/view-quizzes/view-quizzes.component';
import { AddQuizComponent } from './Pages/Admin/add-quiz/add-quiz.component';
import { UpdateQuizComponent } from './Pages/Admin/update-quiz/update-quiz.component';
import { ViewQuizQuestionsComponent } from './Pages/Admin/view-quiz-questions/view-quiz-questions.component';
import { AddQuestionComponent } from './Pages/Admin/add-question/add-question.component';
import { NormalUserWelcomeComponent } from './Pages/Normal/normal-user-welcome/normal-user-welcome.component';
import { LoadquizComponent } from './Pages/Normal/loadquiz/loadquiz.component';
import { InstructionsComponent } from './Pages/Normal/instructions/instructions.component';
import { StartComponent } from './Pages/Normal/start/start.component';

const routes: Routes = [
  {path:"", component:HomeComponent, pathMatch:'full', title:'ExamPortal - Home'},
  {path:"register", component:SignupComponent, pathMatch:'full', title:'ExamPortal - Signup'},
  {path:"login", component:LoginComponent, pathMatch:'full', title:'ExamPortal - Login'},
    
  {path:"start-quiz/:qid",
    component:StartComponent, 
    pathMatch:'full',
    title:'User Dashboard - Quiz', 
    canActivate: [normalGuard]
  },

  {path:"user-dashboard",
  component:UserDashboardComponent,
  title:'ExamPortal - User Dashboard',
  canActivate: [normalGuard],
  children:[
    {
      path:"",
      component:NormalUserWelcomeComponent,
      title:'User Dashboard - Welcome',
    },
    {
      path:":catId",
      component:LoadquizComponent,
      title:'User Dashboard - Quiz',
    },
    {
      path:"instructions/:qid",
      component:InstructionsComponent,
      title:'Quiz - Instructions',
    }
  ]},

  {path:"admin-dashboard",
  component:AdminDashboardComponent,
  title:'ExamPortal - Admin Dashboard',
  canActivate: [adminGuard],
  children:[
    {
      path:"",
      component:WelcomeComponent,
      title:'Admin Dashboard - Welcome',
    },
    {
      path:"profile",
      component:ProfileComponent,
      title:'Admin Dashboard - Profile',
    },
    {
      path:"categories",
      component:ViewCategoriesComponent,
      title:'Admin Dashboard - Categories',
    },
    {
      path:"add-category",
      component:AddCategoryComponent,
      title:'Admin Dashboard - Add Category',
    },
    {
      path:"quizzes",
      component:ViewQuizzesComponent,
      title:'Admin Dashboard - Quizzes',
    },
    {
      path:"add-quiz",
      component:AddQuizComponent,
      title:'Admin Dashboard - Add Quiz',
    },
    {
      path:"update-quiz/:qid",
      component:UpdateQuizComponent,
      title:'Admin Dashboard - Update Quiz',
    },
    {
      path:"quiz-questions/:qid/:title",
      component:ViewQuizQuestionsComponent,
      title:'Admin Dashboard - Questions',
    },
    {
      path:"add-question/:qid/:title",
      component:AddQuestionComponent,
      title:'Admin Dashboard - Add Question',
    }
    
  ]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }