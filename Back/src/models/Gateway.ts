import { Document, Model, model, Schema } from "mongoose";
import Device, { IDevice } from "./Device";

/**
 * Interface to model the Gateway Schema for TypeScript.
 * @param serial:string
 * @param name:string
 * @param IP:string
 */
export interface IGateway extends Document {
  serial: string;
  name: string;
  IP: string;
  devices: IDevice[]
}

const gatewaySchema: Schema = new Schema({
  serial: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  IP: {
    type: String,
    required: true,
  },
  // devices: {
  //   type: [Device],
  //   default: [],
  //   required: false
  // }
});

const Gateway: Model<IGateway> = model("Gateway", gatewaySchema, "Gateway");

export default Gateway;
