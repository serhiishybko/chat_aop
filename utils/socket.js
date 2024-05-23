import { io } from "socket.io-client";
const socket = new WebSocket(
  "wss://api.finanalyst.ai/ws/startInterview",
  "protocolOne"
);
// const socket = io.connect("wss://api.finanalyst.ai/ws/startInterview");
export default socket;
