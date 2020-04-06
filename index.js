const { initializeBuzzer } = require("./buzzer");
const { initializeServer } = require("./server");

// first, we initialize the buzzer
initializeBuzzer();

// then, we initialize express server
initializeServer();
