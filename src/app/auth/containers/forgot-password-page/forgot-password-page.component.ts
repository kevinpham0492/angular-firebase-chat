import { Component, OnInit, OnDestroy } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-forgot-password-page',
  templateUrl: './forgot-password-page.component.html',
  styleUrls: ['./forgot-password-page.component.scss']
})
export class ForgotPasswordPageComponent implements OnInit, OnDestroy {

  forgotPasswordForm: FormGroup;
  forgotPasswordFormErrors: any;

  private componentDestroyed$: Subject<boolean> = new Subject();

  constructor(private formBuilder: FormBuilder) {
    this.forgotPasswordFormErrors = {
      email: {}
    };
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit() {

    this.forgotPasswordForm.valueChanges.pipe(
      takeUntil(this.componentDestroyed$)
    ).subscribe(() => {
      this.onForgotPasswordFormValuesChanged();
    });
  }

  ngOnDestroy() {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }

  private onForgotPasswordFormValuesChanged() {
    for (const field in this.forgotPasswordFormErrors) {
      if (!this.forgotPasswordFormErrors.hasOwnProperty(field)) {
        continue;
      }

      // Clear previous errors
      this.forgotPasswordFormErrors[field] = {};

      // Get the control
      const control = this.forgotPasswordForm.get(field);

      if (control && control.dirty && !control.valid) {
        this.forgotPasswordFormErrors[field] = control.errors;
      }
    }
  }

}
