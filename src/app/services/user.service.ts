import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  AVATAR_BASE_URL = this.api.AVATAR_BASE_URL;

  constructor(private api: ApiService) { }

  getUser(id: string): Observable<User> {
    return this.api.getUser(id);
  }

}
