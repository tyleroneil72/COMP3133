import { Injectable } from "@angular/core";
import { Apollo, gql } from "apollo-angular";

@Injectable({
  providedIn: "root",
})
export class EmployeeService {
  constructor(private apollo: Apollo) {}

  getAllEmployees() {
    return this.apollo.watchQuery({
      query: gql`
        query {
          getAllEmployees {
            id
            first_name
            last_name
            email
            designation
            department
          }
        }
      `,
    }).valueChanges;
  }

  addEmployee(employee: any) {
    return this.apollo.mutate({
      mutation: gql`
        mutation AddEmployee(
          $first_name: String!
          $last_name: String!
          $email: String!
          $designation: String!
          $salary: Float!
          $date_of_joining: String!
          $department: String!
        ) {
          addNewEmployee(
            first_name: $first_name
            last_name: $last_name
            email: $email
            designation: $designation
            salary: $salary
            date_of_joining: $date_of_joining
            department: $department
          ) {
            id
            first_name
            last_name
          }
        }
      `,
      variables: employee,
    });
  }

  deleteEmployee(id: string) {
    return this.apollo.mutate({
      mutation: gql`
        mutation DeleteEmployee($id: ID!) {
          deleteEmployeeByEid(id: $id)
        }
      `,
      variables: { id },
    });
  }

  getEmployeeById(id: string) {
    return this.apollo.watchQuery({
      query: gql`
        query GetEmployeeById($id: ID!) {
          getEmployeeById(id: $id) {
            id
            first_name
            last_name
            email
            designation
            department
          }
        }
      `,
      variables: { id },
    }).valueChanges;
  }

  updateEmployee(id: string, employee: any) {
    return this.apollo.mutate({
      mutation: gql`
        mutation UpdateEmployeeByEid(
          $id: ID!
          $first_name: String
          $last_name: String
          $email: String
          $designation: String
          $department: String
        ) {
          updateEmployeeByEid(
            id: $id
            first_name: $first_name
            last_name: $last_name
            email: $email
            designation: $designation
            department: $department
          ) {
            id
          }
        }
      `,
      variables: { id, ...employee },
    });
  }
}
