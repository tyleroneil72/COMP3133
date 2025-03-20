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

// Corrected function to return ApolloClientOptions instead of an ApolloClient instance
export function createApollo(): ApolloClientOptions<NormalizedCacheObject> {
  return {
    cache: new InMemoryCache(),
    link: new HttpLink({ uri: "http://localhost:3000/graphql" }),
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
