import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useAuthContext } from "./AuthContext";

const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {

    const { authUser } = useAuthContext();
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        if (authUser) {

            const socket = io("https://chat.kavinduchamath.com", {
                withCredentials: true,
                secure: true,
            })

            setSocket(socket);

            socket.on("online-users", (users) => {
                setOnlineUsers(users);
            });

        } else {
            if (socket) {
                socket.disconnect();
                setSocket(null);
            }
        }

        return () => {
            if (socket) {
                socket.disconnect();
                setSocket(null);
            }
        }
    }, [authUser]);

    return (
        <SocketContext.Provider value={{ socket, onlineUsers }}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocketContext = () => {
    return useContext(SocketContext);
};
