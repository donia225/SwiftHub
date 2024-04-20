import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private collabFormData: any;

  private formDataSubject = new BehaviorSubject<any>(null);
  formData$ = this.formDataSubject.asObservable();

  setCollabFormData(formData: any) {
    this.formDataSubject.next(formData);
  }

  getCollabFormData() {
    return this.formDataSubject.getValue();
  }
}
