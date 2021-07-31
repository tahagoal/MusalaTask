import { Router, Response } from "express";
import { check, validationResult } from "express-validator/check";
import HttpStatusCodes from "http-status-codes";

import Gateway, { IGateway } from "../../models/Gateway";
import Request from "../../types/Request";

const router: Router = Router();


// @route   POST api/gateway
// @desc    Create gateways
// @access  Public
router.post(
  "/",
  [
    check("serial", "Serial Number is required").not().isEmpty(),
    check("serial", "Serial Number has to be string").isString(),
    check("name", "Name has to be string").isString(),
    check("name", "Name is required").not().isEmpty(),
    check("IP", "IP is required").not().isEmpty(),
    check("IP", "IP has to be in ip format").isIP()
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(HttpStatusCodes.BAD_REQUEST)
        .json({ errors: errors.array() });
    }

    const { serial, name, IP } = req.body;

    // Build gateway object based on IGateway
    const gatewayFields = {
      serial,
      name,
      IP,
    };

    try {

      let gateway: IGateway = await Gateway.findOne({ serial: req.body.serial });
      if (gateway) {
        // Gateway with this serial already there
        res.status(HttpStatusCodes.BAD_REQUEST).send("Gateway with this serial already exist")
      }

      // Create
      gateway = new Gateway(gatewayFields);

      await gateway.save();

      res.json(gateway);
    } catch (err) {
      console.error(err.message);
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
  }
);


// @route   GET api/gateways
// @desc    Get all Gateways
// @access  Public
router.get("/", async (_req: Request, res: Response) => {
  try {
    const gateways = await Gateway.find();
    res.json(gateways);
  } catch (err) {
    console.error(err.message);
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
});


// @route   GET api/gateway/:gatewayId
// @desc    Get gateway by gatewayId
// @access  Public
router.get("/:gatewayId", async (_req: Request, res: Response) => {
  try {

    const gateway = await Gateway.findById(_req.params.gatewayId);
    res.json(gateway);
  
  } catch (err) {
    console.error(err.message);
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
});

export default router;
