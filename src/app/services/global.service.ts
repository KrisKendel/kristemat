import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GlobalService {
  avatarChange = new BehaviorSubject(this.theAvatar);

  set theAvatar(value) {
    this.avatarChange.next(value);
    localStorage.setItem('avatar', value);
  }

  get theAvatar() {
    return localStorage.getItem('avatar');
  }
}
