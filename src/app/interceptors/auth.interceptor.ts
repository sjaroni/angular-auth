import { HttpInterceptorFn } from "@angular/common/http";

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  // Get the token from local storage
  const token = localStorage.getItem('token') ?? '';
  // If no token is found, just pass the request through

  request = request.clone({
    setHeaders: {
      Authorization: token ? `Token ${token}` : '',
    }
  });

  // Pass the cloned request instead of the original request to the next handle
  return next(request);
}