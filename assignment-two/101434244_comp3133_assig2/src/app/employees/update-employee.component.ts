import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { EmployeeService } from "../services/employee.service";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { NavbarComponent } from "../shared/navbar/navbar.component";
import { RouterModule } from "@angular/router";

@Component({
  selector: "app-update-employee",
  standalone: true,
  templateUrl: "./update-employee.component.html",
  imports: [CommonModule, FormsModule, RouterModule, NavbarComponent],
})
export class UpdateEmployeeComponent implements OnInit {
  employeeId: string = "";
  employee: any = {
    first_name: "",
    last_name: "",
    email: "",
    designation: "",
    department: "",
    salary: 0,
    date_of_joining: "",
    gender: "",
  };

  successMessage: string = "";
  errorMessage: string = "";

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit() {
    this.employeeId = this.route.snapshot.paramMap.get("id") || "";
    this.employeeService
      .getEmployeeById(this.employeeId)
      .subscribe((res: any) => {
        this.employee = { ...res.data.getEmployeeById };
        console.log(this.employee);
        console.log(
          "RAW DATE FROM BACKEND:",
          res.data.getEmployeeById.date_of_joining
        );

        const rawDate = this.employee.date_of_joining;

        if (rawDate && !isNaN(rawDate)) {
          const dateObj = new Date(Number(rawDate));
          this.employee.date_of_joining = dateObj.toISOString().split("T")[0];
        } else {
          this.employee.date_of_joining = "";
        }
      });
  }

  updateEmployee() {
    this.employeeService
      .updateEmployee(this.employeeId, this.employee)
      .subscribe(
        () => {
          this.successMessage = "Employee updated successfully!";
          console.log("Sending update:", this.employee);

          setTimeout(() => {
            this.router.navigate(["/employees"]);
          }, 1500);
        },
        (error) => {
          console.error("Update error:", error);
          this.errorMessage = "Failed to update employee. Please try again.";
        }
      );
  }
}
