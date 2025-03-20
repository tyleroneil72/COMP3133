import { Routes, CanActivateFn } from "@angular/router";
import { LoginComponent } from "./auth/login.component";
import { SignupComponent } from "./auth/signup.component";
import { EmployeeListComponent } from "./employees/employee-list.component";
import { AddEmployeeComponent } from "./employees/add-employee.component";
import { UpdateEmployeeComponent } from "./employees/update-employee.component";

const authGuard: CanActivateFn = () => {
  return !!localStorage.getItem("token");
};

export const routes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent },
  {
    path: "employees",
    component: EmployeeListComponent,
    canActivate: [authGuard],
  },
  {
    path: "add-employee",
    component: AddEmployeeComponent,
    canActivate: [authGuard],
  },
  {
    path: "update-employee/:id",
    component: UpdateEmployeeComponent,
    canActivate: [authGuard],
  },
];
