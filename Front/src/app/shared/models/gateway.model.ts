import { Device } from "./device.model";

export interface GateWay {
  serial: string;
  name: string;
  ip: string;
  devices: Device[];
}
