import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-logout",
  standalone: true,
  template: "",
})
export class LogoutComponent {
  constructor(private router: Router) {
    localStorage.removeItem("token");
    this.router.navigate(["/login"]);
  }
}
