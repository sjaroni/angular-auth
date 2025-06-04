import { Injectable, signal } from '@angular/core';
import { UserInterface } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  currentUserSig = signal<UserInterface | undefined | null >(undefined);
  // undefinded = initial state
  // null = unauthorized
  // user = logged in

}
