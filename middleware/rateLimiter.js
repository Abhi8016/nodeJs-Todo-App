const accessModel = require("../models/accessModel");

const rateLimiter = async (req, res, next) => {
  const sid = req.session.id;
  //find the entry in accessDB

  try {
    const accessDb = await accessModel.findOne({ sessionId: sid });

    if (!accessDb) {
      const accessObj = new accessModel({
        sessionId: sid,
        req_time: Date.now(),
      });

      await accessObj.save();
      next();
      return;
    }

    // compare the time difference of prev and new request
    const timeDiff = (Date.now() - accessDb.req_time) / 1000;

    if (timeDiff < 3) {
      return res.send({
        status: 404,
        message: "avi 10 sec ruko !!!",
      });
    }
    //updating time in accessDb
    await accessModel.findOneAndUpdate(
      { sessionId: sid },
      { req_time: Date.now() }
    );
    next();
  } catch (error) {
    return res.send({
      status: 500,
      message: "Kuch to gadbad hai daya !!! from rateLimiter",
      error: error,
    });
  }
};

module.exports = rateLimiter ;
