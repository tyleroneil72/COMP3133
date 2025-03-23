import { Component } from "@angular/core";
import { EmployeeService } from "../services/employee.service";
import { Router } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { NavbarComponent } from "../shared/navbar/navbar.component";

@Component({
  selector: "app-add-employee",
  templateUrl: "./add-employee.component.html",
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, NavbarComponent],
})
export class AddEmployeeComponent {
  employee = {
    first_name: "",
    last_name: "",
    email: "",
    designation: "",
    salary: 0,
    date_of_joining: "",
    department: "",
  };

  successMessage: string = "";
  errorMessage: string = "";

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  addEmployee() {
    this.employeeService.addEmployee(this.employee).subscribe(
      () => {
        this.successMessage = "Employee added successfully!";
        setTimeout(() => {
          this.router.navigate(["/employees"]);
        }, 1500);
      },
      (error) => {
        console.error("Add error:", error);
        this.errorMessage = "Failed to add employee. Please try again.";
      }
    );
  }
}
