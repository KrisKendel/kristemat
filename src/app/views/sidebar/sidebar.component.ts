import { Component, OnInit } from '@angular/core';
import { AppUser, UserType } from 'src/app/models/app-user';
import { UserService } from 'src/app/services/users.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  activeUser: AppUser;
  canSeeAdvisorsList = false;
  avatar: any;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.checkUserType();
  }

  checkUserType() {
    this.userService.getActiveUser().subscribe((user) => {
      this.activeUser = user;
      if (this.activeUser.type === UserType.CLIENT) {
        this.canSeeAdvisorsList = true;
      } else {
        this.canSeeAdvisorsList = false;
      }
    },
      (error) => console.log(error)
    );
  }
}
