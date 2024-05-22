import { io } from "socket.io-client";
const socket = io.connect("http://10.0.2.2:4000");
// const socket = io.connect("wss://api.finanalyst.ai/ws/startInterview");
export default socket;
