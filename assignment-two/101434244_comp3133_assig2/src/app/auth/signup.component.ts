import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";
import { RouterModule } from "@angular/router";

@Component({
  selector: "app-signup",
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
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
        if (response.data.signup) {
          localStorage.setItem("token", "temp_token");
          this.router.navigate(["/employees"]);
        } else {
          this.errorMessage = "Signup failed. Please try again.";
        }
      },
      (error) => {
        console.error("Signup error:", error);
        this.errorMessage = error?.message || "Signup failed.";
      }
    );
  }
}
