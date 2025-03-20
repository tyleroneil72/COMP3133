import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [FormsModule],
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
        if (response.data.signin.token) {
          localStorage.setItem("token", response.data.signin.token || "err");
          this.router.navigate(["/employees"]); // Redirect to employees page
        }
      },
      (error) => {
        console.error("Login error:", error);
        this.errorMessage = "Invalid email or password.";
      }
    );
  }
}
