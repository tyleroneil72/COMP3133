import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { EmployeeService } from "../services/employee.service";
import { NavbarComponent } from "../shared/navbar/navbar.component";

@Component({
  selector: "app-employee-list",
  templateUrl: "./employee-list.component.html",
  styleUrls: ["./employee-list.component.css"],
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent],
})
export class EmployeeListComponent implements OnInit {
  employees: any[] = [];

  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.employeeService.getAllEmployees().subscribe((response: any) => {
      this.employees = response.data.getAllEmployees;
    });
  }

  deleteEmployee(id: string) {
    this.employeeService.deleteEmployee(id).subscribe(() => {
      this.employees = this.employees.filter((emp) => emp.id !== id);
    });
  }
}
