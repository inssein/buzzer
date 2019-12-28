const SerialPort = require("serialport");
const Readline = require("@serialport/parser-readline");
const debug = require("debug")("buzzer");

// open connection to modem
const port = new SerialPort("/dev/ttyACM0");

// set readline parser
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
    // 1) Pick up the call
    port.write("ATH1\r");

    // 2) Open the door (by dialing 6)
    // Note: had to use a setTimeout, otherwise it wouldn't dial 6
    setTimeout(() => port.write("ATD6\r"), 1000);
  }
});

parser.on("error", error => debug("ERROR: " + error));
parser.on("close", () => debug("CLOSED"));
