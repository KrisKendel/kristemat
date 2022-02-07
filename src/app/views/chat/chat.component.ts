import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatWith } from 'src/app/models/chat';
import { UserService } from 'src/app/services/users.service';
import * as moment from 'moment';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, OnDestroy {
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
  destroyed$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,

  ) { }
  // TODO Needs big refactor
  ngOnInit(): void {

    this.sessionId = this.route.snapshot.params.id;
    this.userService.getActiveUser()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((user) => {
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

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  getOwnerAndParticipant() {
    this.userService
      .getUserById(this.activeSession.participantId)
      .pipe(takeUntil(this.destroyed$))
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
    this.userService.getUserById(this.activeSession.ownerId)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((owner) => {
        this.ownerName = owner.userName;
        this.ownerAvatar = owner.avatar;
      },
        (error) => console.log(error));
  }
}
