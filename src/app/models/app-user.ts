import { Session } from './session.model';

export enum UserType {
  ADVISOR,
  CLIENT,
}

export class AppUser {
  id: string;
  userName: string;
  email: string;
  password: string;
  gender: string;
  avatar: string;
  description: string;
  type: UserType;
  sessions: Session[];
  title?: string;
}
