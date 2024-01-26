const path = require("path");

const ProtocolRegistry = require("protocol-registry");

ProtocolRegistry.checkifExists("bidsee")
  .then((res) => {
    console.log(res); // true or false
    // do something
  })
  .catch((e) => {
    // do something
  });

console.log("Registering...");
// Registers the Protocol
ProtocolRegistry.register({
  protocol: "bidsee", // sets protocol for your command , testproto://**
  command: `node ${path.join(__dirname, "./register.js")} $_URL_`, // this will be executed with a extra argument %url from which it was initiated
  override: true, // Use this with caution as it will destroy all previous Registrations on this protocol
  terminal: true, // Use this to run your command inside a terminal
  script: false,
  scriptName: 'my-custom-script-name' // Custom script name.
}).then(async () => {
  console.log("Successfully registered");
});

