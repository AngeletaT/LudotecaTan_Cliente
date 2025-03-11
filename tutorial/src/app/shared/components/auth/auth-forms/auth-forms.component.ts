import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-auth-forms',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './auth-forms.component.html',
  styleUrl: './auth-forms.component.scss',
})
export class AuthFormsComponent implements OnInit {
  isLoginMode: boolean = true;
  loginForm: FormGroup;
  registerForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSwitchMode(): void {
    this.isLoginMode = !this.isLoginMode;
    this.errorMessage = '';
  }

  onSubmitLogin(): void {
    if (this.loginForm.invalid) {
      return;
    }
    const { username, password } = this.loginForm.value;
    this.authService.login(username, password).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        this.errorMessage = 'Credenciales inválidas';
      }
    );
  }

  onSubmitRegister(): void {
    if (this.registerForm.invalid) {
      return;
    }
    const { username, password } = this.registerForm.value;
    this.authService.register(username, password).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        this.errorMessage = 'Error en el registro';
      }
    );
  }
}
