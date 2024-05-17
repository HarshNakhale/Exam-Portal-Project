import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../Login/login.service';
import { inject } from '@angular/core';

export const normalGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService)
  const router = inject(Router);
  if(loginService.isLoggedIn() && loginService.getUserRole() == 'Normal'){
    return true;
  }

  router.navigate(['login'])
  return false
};
