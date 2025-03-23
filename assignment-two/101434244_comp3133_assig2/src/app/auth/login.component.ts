import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";
import { RouterModule } from "@angular/router";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: "./login.component.html",
})
export class LoginComponent {
  email: string = "";
  password: string = "";
  errorMessage: string = "";

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.email, this.password).subscribe(
      (response) => {
        if (response.data.signin) {
          localStorage.setItem("token", "temp_token");
          this.router.navigate(["/employees"]);
        } else {
          this.errorMessage = "Invalid credentials. Please try again.";
        }
      },
      (error) => {
        console.error("Login error:", error);
        this.errorMessage = error?.message || "Login failed.";
      }
    );
  }
}
