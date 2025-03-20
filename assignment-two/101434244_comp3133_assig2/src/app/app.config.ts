import { ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
import { provideRouter } from "@angular/router";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { APOLLO_OPTIONS } from "apollo-angular";
import { ApolloClient, InMemoryCache } from "@apollo/client/core";
import { routes } from "./app.routes";

const authInterceptor = (req: any, next: any) => {
  const token = localStorage.getItem("token");
  if (token) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
  }
  return next(req);
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    {
      provide: APOLLO_OPTIONS,
      useFactory: () => {
        return new ApolloClient({
          uri: "http://localhost:3000/graphql",
          cache: new InMemoryCache(),
        });
      },
    },
  ],
};
