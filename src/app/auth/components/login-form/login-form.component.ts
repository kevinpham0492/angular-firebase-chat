import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Credential } from '../../models';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit, OnDestroy {
  @Output() login: EventEmitter<Credential>;

  loginForm: FormGroup;
  loginFormErrors: any;

  private componentDestroyed$: Subject<boolean> = new Subject();

  constructor(private formBuilder: FormBuilder) {
    this.login = new EventEmitter();

    this.loginFormErrors = {
      username: {},
      password: {}
    };
    this.loginForm = this.formBuilder.group({
      username: ['demo', [Validators.required]],
      password: ['demo', Validators.required]
    });
  }

  ngOnInit() {
    this.loginForm.valueChanges.pipe(
      takeUntil(this.componentDestroyed$)
    ).subscribe(() => {
      this.onLoginFormValuesChanged();
    });
  }

  ngOnDestroy() {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }

  onSubmit(): void {
    if (!this.loginForm.valid) {
      return;
    }
    this.login.emit(this.loginForm.value);
  }

  private onLoginFormValuesChanged() {
    for (const field in this.loginFormErrors) {
      if (!this.loginFormErrors.hasOwnProperty(field)) {
        continue;
      }

      // Clear previous errors
      this.loginFormErrors[field] = {};

      // Get the control
      const control = this.loginForm.get(field);

      if (control && control.dirty && !control.valid) {
        this.loginFormErrors[field] = control.errors;
      }
    }
  }

}
