const db = require("./db");
const SerialPort = require("serialport");
const Readline = require("@serialport/parser-readline");
const debug = require("debug")("buzzer");

// open connection to modem
const port = new SerialPort("/dev/ttyACM0");

exports.initializeBuzzer = () => {
  const parser = new Readline({ delimiter: "\r\n" });
  port.pipe(parser);

  // log when the port is opened
  port.on("open", () => {
    debug("MODEM OPENED");

    // when port is open, send reset command
    port.write("ATZ\r", () => {
      debug("RESET");
    });
  });

  parser.on("data", data => {
    debug("DATA RECEIVED: ", data);

    // when a RING command is received
    if (data.indexOf("RING") > -1) {
      db.shouldOpenDoor().then(allow => {
        if (allow) {
          // 1) Pick up the call
          port.write("ATH1\r");

          // 2) Open the door (by dialing 6)
          // Note: had to use a setTimeout, otherwise it wouldn't dial 6
          setTimeout(() => port.write("ATD6\r"), 1000);

          // 3) Record Entry
          db.recordAllowedEntry();
        } else {
          // 1) Record Disallowed Entry
          db.recordDisallowedEntry();

          // 2) Hangup
          port.write("ATH0\r");
        }
      });
    }
  });

  parser.on("error", error => debug("ERROR: " + error));
  parser.on("close", () => debug("CLOSED"));
}
