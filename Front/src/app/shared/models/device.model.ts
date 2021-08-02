import { Status } from "../enums/status.enum";

export interface Device {
  uid: number;
  vendor: string;
  gatewayId: string;
  dateCreated: Date;
  status: Status;
}
