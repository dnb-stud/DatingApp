import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Nav } from "../layout/nav/nav";
import { AccountService } from '../core/services/account-service';
import { Home } from '../features/home/home';
import { IUser } from '../types/user';

@Component({
  selector: 'app-root',
  imports: [Nav, Home],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private accountService = inject(AccountService);
  private readonly http = inject(HttpClient);
  protected readonly title = signal('Date app');
  protected readonly members = signal<IUser[]>([]);

  async ngOnInit() {
    this.members.set(await this.getMembers());
    this.setCurrentUser();
  }

  setCurrentUser() {
    const userString = localStorage.getItem('user');
    if (!userString) return;
    const user = JSON.parse(userString);
    this.accountService.currentUser.set(user);
  }

  private async getMembers() {
    try {
      return lastValueFrom(this.http.get<IUser[]>('https://localhost:5001/api/members'));
    } catch (error) {
      console.log(error);
      throw error;
    } 
  }
}
