import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Nav } from "../layout/nav/nav";
import { IUser } from '../types/user';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [Nav, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private readonly http = inject(HttpClient);
  protected router = inject(Router);
  protected readonly title = signal('Date app');
  protected readonly members = signal<IUser[]>([]);
  public get isItHomePath() { return this.router.url === '/'; };

  async ngOnInit() {
    this.members.set(await this.getMembers());
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
