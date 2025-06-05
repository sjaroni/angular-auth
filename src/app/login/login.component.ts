import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserInterface } from '../interfaces/user.interface';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  fb = inject(FormBuilder);
  http = inject(HttpClient);
  authService = inject(AuthService);
  router = inject(Router);
  isSubmitted: boolean = false;
  loginError: string | null = null;

  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  onSubmit(): void {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return; // Beende die Methode, wenn das Formular ungültig ist
    }

    this.http
      .post<UserInterface>(
        'http://localhost:3000/auth/login',
        this.form.getRawValue()
      )
      .subscribe({
        next: (response) => {
          const userWithTokens: UserInterface = {
            ...response,
            username: this.form.get('username')?.value || '',
            token: response.token,
            refreshToken: response.refreshToken,
          };

          localStorage.setItem('token', response.token);
          localStorage.setItem('refreshToken', response.refreshToken);
          this.authService.currentUserSig.set(userWithTokens);
          this.router.navigateByUrl('/');
        },
        error: (err) => {
          this.loginError = 'Benutzername oder Passwort ist falsch.';
        },
      });
  }

  isFieldValid(fieldName: string): boolean {
    const control = this.form.get(fieldName);
    return !!(
      control?.invalid &&
      (control?.dirty || control?.touched || this.isSubmitted)
    );
  }
}
