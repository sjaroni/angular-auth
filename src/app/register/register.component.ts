import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserInterface } from '../interfaces/user.interface';
// import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  fb = inject(FormBuilder);
  http = inject(HttpClient);
  // authService = inject(AuthService);
  router = inject(Router);
  isSubmitted: boolean = false;

  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  onSubmit(): void {
    this.isSubmitted = true;
    
if (this.form.invalid) {
    return; // Beende die Methode, wenn das Formular ungültig ist
  }

    this.http
    .post<UserInterface>(
      'http://localhost:3000/auth/signup',
      this.form.getRawValue()
    )
    .subscribe((response) => {
      // wenn geklappt dann login durchführen und token speichern
      // localhost:3000/auth/login (username, password)
      
      console.log('response', response);
      //localStorage.setItem('token', response);
      // this.authService.currentUserSig.set(response.user);
      this.router.navigateByUrl('/');
    });
  }

  isFieldValid(fieldName: string): boolean {
    const control = this.form.get(fieldName);
    return !!(control?.invalid && (control?.dirty || control?.touched || this.isSubmitted));
  }

}
