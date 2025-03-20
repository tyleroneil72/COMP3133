import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-update-employee",
  templateUrl: "./update-employee.component.html",
  standalone: true,
  imports: [FormsModule],
})
export class UpdateEmployeeComponent {
  employee = {
    first_name: "",
    last_name: "",
    email: "",
    designation: "",
    department: "",
  };

  constructor() {}

  updateEmployee() {
    console.log("Employee updated:", this.employee);
  }
}
