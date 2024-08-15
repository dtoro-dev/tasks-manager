import { Injectable } from '@angular/core';
import Swal, { SweetAlertOptions } from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class SweetAlertService {
  constructor() {}

  showAlert(options: SweetAlertOptions) {
    return Swal.fire(options);
  }

  showSuccess(message: string, title: string = 'Success') {
    return Swal.fire({
      title,
      text: message,
      icon: 'success',
    });
  }

  showError(message: string, title: string = 'Error') {
    return Swal.fire({
      title,
      text: message,
      icon: 'error',
    });
  }

  showWarning(message: string, title: string = 'Warning') {
    return Swal.fire({
      title,
      text: message,
      icon: 'warning',
    });
  }

  showInfo(message: string, title: string = 'Info') {
    return Swal.fire({
      title,
      text: message,
      icon: 'info',
    });
  }

  showConfirmation(message: string, title: string = 'Are you sure?') {
    return Swal.fire({
      title,
      text: message,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    });
  }
}
