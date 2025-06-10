import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { HttpClient } from '@angular/common/http';
import { UserInterface } from './interfaces/user.interface';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'angular-auth';
  authService = inject(AuthService);
  http = inject(HttpClient);

  ngOnInit(): void {
    // check if user is logged in
    // send refresh token to backend
    // and get new access token
    this.http
      .get<{ user: UserInterface }>('http://localhost:3000/auth/check')
      .subscribe({
        next: (response) => {
          console.log('check response', response);
          this.authService.currentUserSig.set(response.user);
        },
        error: () => {
          this.authService.currentUserSig.set(null);
        },
      });
  }

  logout() {
    console.log('logout');
    localStorage.setItem('token', '');
    this.authService.currentUserSig.set(null);
  }
}
