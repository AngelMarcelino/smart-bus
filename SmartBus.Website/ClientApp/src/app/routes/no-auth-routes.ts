import { LoginComponent } from '../login/login.component';

import { RegisterComponent } from '../components/register/register.component';

import { ValidateEmailComponent } from '../components/register/validate-email.component';

import { ValidationErrorComponent } from '../components/register/validation-error.component';

import { ValidationSucceedComponent } from '../components/register/validation-succeed.component';

export const NoAuthRoutes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'validate-email',
    component: ValidateEmailComponent
  },
  {
    path: 'validate-email/:resend',
    component: ValidateEmailComponent
  },
  {
    path: 'validation-error',
    component: ValidationErrorComponent
  },
  {
    path: 'validation-succeed',
    component: ValidationSucceedComponent
  }
];

