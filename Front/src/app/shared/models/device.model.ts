import { Status } from "../enums/status.enum";

export interface Device {
  uid: number;
  vendor: string;
  dateCreated: Date;
  status: Status;
}
