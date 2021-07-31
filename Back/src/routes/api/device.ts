import { Router, Response } from "express";
import { check, validationResult } from "express-validator/check";
import HttpStatusCodes from "http-status-codes";

import Device, { IDevice } from "../../models/Device";
import Gateway, { IGateway } from "../../models/Gateway";
import Request from "../../types/Request";

const router: Router = Router();


// @route   POST api/device
// @desc    Create device
// @access  Public
router.post(
  "/",
  [
    check("uid", "UID Number is required").not().isEmpty(),
    check("vendor", "Vendor is required").not().isEmpty(),
    check("vendor", "Vendor has to be string").isString(),
    check("status", "Status has to be boolean").isBoolean(),
    check("gatewayId", "Gateway ID is required").not().isEmpty()
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(HttpStatusCodes.BAD_REQUEST)
        .json({ errors: errors.array() });
    }

    const { uid, vendor, status, gatewayId } = req.body;

    // Build device object based on IDevice
    const deviceFields = {
      uid,
      vendor,
      status,
      gatewayId
    };

    try {

      let device: IDevice = await Device.findOne({ uid: req.body.uid });
      if (device) {
        // Device with this serial already there
        res.status(HttpStatusCodes.BAD_REQUEST).send("Device with this UID already exist")
      }

      let gateway: IGateway = await Gateway.findOne({ id: req.body.gatewayId });
      if (!gateway) {
        // Device with this serial already there
        res.status(HttpStatusCodes.BAD_REQUEST).send("Gateway with this ID not exist")
      }
      else{
      // Also check here if it exceeds 10 devices per gateway or not
      const devices = await Device.find({gatewayId: req.params.gatewayId});
        if(devices.length >= 10){
          res.status(HttpStatusCodes.BAD_REQUEST).send("No more than 10 device are allowed for a gateway")
        }
      }

      // Create
      device = new Device(deviceFields);

      await device.save();

      res.json(device);
    } catch (err) {
      console.error(err.message);
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
  }
);


// @route   GET api/devices/:gatewayId
// @desc    Get devices by gatewayId
// @access  Public
router.get("/:gatewayId", async (_req: Request, res: Response) => {
  try {

    const devices = await Device.find({gatewayId: _req.params.gatewayId});
    res.json(devices);
  
  } catch (err) {
    console.error(err.message);
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
});


// @route   DELETE api/device
// @desc    Delete device
// @access  Private
router.delete("/", async (req: Request, res: Response) => {
  try {
    // Remove Device
    await Device.findOneAndRemove({ id: req.deviceId });

    res.json({ msg: "Device removed" });
  } catch (err) {
    console.error(err.message);
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
});

export default router;
