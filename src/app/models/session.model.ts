export enum SessionStatus {
  AVAILABLE,
  REQUESTED,
  REJECTED,
  ACCEPTED,
  FINISHED,
}

export class Session {
  appUserId: string;
  date: string;
  participantId: string;
  id: string;
  status: SessionStatus;
  title: string;
  start: string;
  end: string;
  sessionApplicant: string;
  color: string;
  display: string;
  reformatDate: string;
  statusString: string;
  eventColor?: string;
}

export class SessionResponse {
  message: string;
}
