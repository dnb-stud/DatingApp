import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { ILoginCreds, IRegisterCreds, IUser } from '../../types/user';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private http = inject(HttpClient);
  public currentUser = signal<IUser | null>(null);
  
  baseUrl = 'https://localhost:5001/api/';

  register(creds: IRegisterCreds) {
    return this.http.post<IUser>(this.baseUrl + 'account/register', creds)
    .pipe(tap((user) => {
      if (user) {
        this.setUser(user);
      }
    }));
  }

  login(creds: ILoginCreds) {
    return this.http.post<IUser>(this.baseUrl + 'account/login', creds)
    .pipe(tap((user) => {
      if (user) {
        this.setUser(user);
      }
    }));
  }

  setUser(user: IUser) {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUser.set(user);    
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUser.set(null);
  }
}
