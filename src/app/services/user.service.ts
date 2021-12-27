import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { ApiService } from './api.service';
import { BaseStore } from './base.store';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  AVATAR_BASE_URL = this.api.AVATAR_BASE_URL;

  private userStore: BaseStore<string,User>;

  constructor(private api: ApiService) {
    this.userStore = new BaseStore<string,User>((id: string) => { return this.api.getUser(id) });
  }

  getUser(id: string): Observable<User> {
    return this.userStore.get(id);
  }



}
