import { Component } from "@angular/core";
import { EmployeeService } from "../services/employee.service";
import { Router } from "@angular/router";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-add-employee",
  templateUrl: "./add-employee.component.html",
  imports: [FormsModule],
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

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  addEmployee() {
    this.employeeService.addEmployee(this.employee).subscribe(() => {
      this.router.navigate(["/employees"]);
    });
  }
}
