import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";

export class LoggingInterceptorService implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return next.handle(req);
    }
}