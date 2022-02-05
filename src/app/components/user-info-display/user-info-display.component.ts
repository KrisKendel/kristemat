import { Component, OnInit, Output } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-user-info-display',
  templateUrl: './user-info-display.component.html',
  styleUrls: ['./user-info-display.component.scss'],
})
export class UserInfoDisplayComponent implements OnInit {
  avatar: string;
  userName: string;
  count: any;

  constructor(private globalService: GlobalService) {
    this.globalService.avatarChange.subscribe((avatar) => {
      this.avatar = avatar;
    });
  }

  ngOnInit(): void {
    this.getInfo();
  }

  getInfo(): void {
    this.userName = localStorage.getItem('username');
    this.avatar = localStorage.getItem('avatar');
  }
}
