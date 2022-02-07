import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatWith } from 'src/app/models/chat';
import { UserService } from 'src/app/services/users.service';
import * as moment from 'moment';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  activeSession: any;
  sessionId: string;
  activeUserName: string;
  ownerName: string;
  ownerAvatar: string;
  participantName: string;
  participantAvatar: string;
  chatWith: ChatWith = {};
  requestDate: any;
  liveData$: Observable<any>;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,

  ) { }
  // TODO Needs big refactor
  ngOnInit(): void {

    this.sessionId = this.route.snapshot.params.id;
    this.userService.getActiveUser().subscribe((user) => {
      this.activeUserName = user.userName;
      if (user.sessions) {
        user.sessions.forEach((session) => {
          if (session.id === this.sessionId) {
            this.activeSession = session;
            this.requestDate = moment(this.activeSession.requestedAt).format(
              'Do MMM YY'
            );
          }
        });
      }
      if (this.activeSession) {
        this.getOwnerAndParticipant();
      }
    },
      (error) => console.log(error)
    );
  }

  getOwnerAndParticipant() {
    this.userService
      .getUserById(this.activeSession.participantId)
      .subscribe((particpant) => {
        this.participantName = particpant.userName;
        this.participantAvatar = particpant.avatar;
        if (this.activeUserName === this.participantName) {
          this.chatWith.userName = this.ownerName;
          this.chatWith.avatar = this.ownerAvatar;
        } else {
          this.chatWith.userName = this.participantName;
          this.chatWith.avatar = this.participantAvatar;
        }
      },
        (error) => console.log(error));
    this.userService.getUserById(this.activeSession.ownerId).subscribe((owner) => {
      this.ownerName = owner.userName;
      this.ownerAvatar = owner.avatar;
    },
      (error) => console.log(error));
  }
}
