import { Injectable } from "@angular/core";
import { Apollo, gql } from "apollo-angular";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private apollo: Apollo) {}

  signup(username: string, email: string, password: string): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`
        mutation Signup(
          $username: String!
          $email: String!
          $password: String!
        ) {
          signup(username: $username, email: $email, password: $password)
        }
      `,
      variables: {
        username,
        email,
        password,
      },
    });
  }

  login(email: string, password: string): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`
        mutation Signin($email: String!, $password: String!) {
          signin(email: $email, password: $password)
        }
      `,
      variables: {
        email,
        password,
      },
    });
  }
}
