import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotificationService } from '../services';

@Injectable()
export class HttpErrorInterceptorService implements HttpInterceptor {
  constructor(
    private notificationService: NotificationService,
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(ex => {
        let InternalServerErrorMessage = '';
        switch (ex.status) {
          case 401:
            InternalServerErrorMessage = 'Vạn không có quyền';
            break;
          case 403:
              InternalServerErrorMessage = 'Bạn không được phép thực hiện yêu cầu này!';
            break;
          case 404:
            InternalServerErrorMessage = 'Không tìm thấy trang bạn yêu cầu!';
            break;
          case 500:
            InternalServerErrorMessage = 'Lỗi hệ thống';
            break;
          default:
            InternalServerErrorMessage = 'Lỗi hệ thống';
            break;
        }
        this.notificationService.showError(InternalServerErrorMessage);
        return throwError(ex);
      })
    );
  }
}
