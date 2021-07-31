import { Document, Model, model, Schema } from "mongoose";
import { Status } from "../enums/status.enum";

/**
 * Interface to model the Device Schema for TypeScript.
 * @param uid:number
 * @param vendor:string
 * @param IP:string
 */
export interface IDevice extends Document {
  uid: number;
  vendor: string;
  status: string;
  gatewayId: string;
}

const deviceSchema: Schema = new Schema({
  uid: {
    type: Number,
    required: true,
    unique: true
  },
  gatewayId: {
    type: String,
    required: true,
  },
  vendor: {
    type: String,
    required: true
  },
  status: {
    type: Status,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Device: Model<IDevice> = model("Device", deviceSchema, "Device");

export default Device;
