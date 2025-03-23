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
  };

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
        this.employee = res.data.getEmployeeById;
      });
  }

  updateEmployee() {
    this.employeeService
      .updateEmployee(this.employeeId, this.employee)
      .subscribe(() => {
        this.router.navigate(["/employees"]);
      });
  }
}
