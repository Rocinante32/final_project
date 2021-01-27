import io from "socket.io-client";
// import { postNewMessage, addTenLastMessagesToRedux } from "./actions";

export let socket;

export const init = (store) => {
    if (!socket) {
        socket = io.connect();
    }
};
