import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-signup",
  standalone: true,
  imports: [FormsModule],
  templateUrl: "./signup.component.html",
})
export class SignupComponent {
  username: string = "";
  email: string = "";
  password: string = "";
  errorMessage: string = "";

  constructor(private authService: AuthService, private router: Router) {}

  signup() {
    this.authService.signup(this.username, this.email, this.password).subscribe(
      (response) => {
        if (response.data.signup.token) {
          localStorage.setItem("token", response.data.signup.token);
          this.router.navigate(["/employees"]); // Redirect to employees page
        }
      },
      (error) => {
        console.error("Signup error:", error);
        this.errorMessage = "Signup failed. Please try again.";
      }
    );
  }
}
