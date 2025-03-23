import { ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
import { provideRouter } from "@angular/router";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { provideApollo } from "apollo-angular";
import { HttpLink } from "@apollo/client/core";
import {
  InMemoryCache,
  ApolloClientOptions,
  NormalizedCacheObject,
} from "@apollo/client/core";
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

export function createApollo(): ApolloClientOptions<NormalizedCacheObject> {
  return {
    cache: new InMemoryCache(),
    // link: new HttpLink({ uri: "http://localhost:3000/graphql" }),
    link: new HttpLink({ uri: "https://a2-backend-fi66.onrender.com/graphql" }),
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideApollo(createApollo), // Corrected
  ],
};
