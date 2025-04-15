import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

// Mock socket implementation for demo purposes
class MockSocketConnection {
  constructor() {
    this.listeners = {};
    this.connected = false;
    this.userId = null;
    console.log("Mock socket initiated");
  }

  connect(userId) {
    this.userId = userId;
    this.connected = true;
    console.log(`Mock socket connected for user ${userId}`);

    // Simulate connection event
    setTimeout(() => {
      this.emit("connected", { userId });
    }, 500);

    return this;
  }

  disconnect() {
    this.connected = false;
    this.userId = null;
    console.log("Mock socket disconnected");
    return this;
  }

  on(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
    return this;
  }

  off(event, callback) {
    if (!callback) {
      delete this.listeners[event];
    } else if (this.listeners[event]) {
      this.listeners[event] = this.listeners[event].filter(
        (cb) => cb !== callback
      );
    }
    return this;
  }

  emit(event, data) {
    if (this.listeners[event]) {
      this.listeners[event].forEach((callback) => callback(data));
    }
    return this;
  }

  sendMessage(message) {
    setTimeout(() => {
      const timestamp = new Date().toISOString();
      const fullMessage = {
        ...message,
        id: `msg_${Math.random().toString(36).substr(2, 9)}`,
        timestamp,
        read: false,
      };

      this.emit("new_message", fullMessage);

      setTimeout(() => {
        if (
          message.senderId !== this.userId &&
          message.receiverId === this.userId
        ) {
          const response = {
            id: `msg_${Math.random().toString(36).substr(2, 9)}`,
            senderId: message.receiverId,
            receiverId: message.senderId,
            message: this.generateResponse(),
            timestamp: new Date().toISOString(),
            read: false,
          };
          this.emit("new_message", response);
        }
      }, 5000 + Math.random() * 5000);
    }, 500);
  }

  generateResponse() {
    const responses = [
      "Thank you for sharing that with me. How long have you been feeling this way?",
      "I understand this must be difficult. Can you tell me more about what's been going on?",
      "I appreciate you reaching out. Have you tried any coping strategies that have helped in the past?",
      "That sounds challenging. Let's work together to find some strategies that might help.",
      "I'm here to support you. What would be most helpful for you right now?",
      "It's important to address these feelings. Have you discussed this with anyone else in your support network?",
      "Thank you for trusting me with this information. Let's discuss some potential next steps.",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  isConnected() {
    return this.connected;
  }
}

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const { authState } = useAuth();
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [availableDoctors, setAvailableDoctors] = useState([]);

  useEffect(() => {
    if (authState.isAuthenticated && authState.user) {
      const newSocket = new MockSocketConnection().connect(authState.user.id);
      setSocket(newSocket);

      newSocket.on("connected", () => {
        setIsConnected(true);
        console.log("Socket connected");

        if (authState.user?.role === "patient") {
          const mockDoctors = [
            {
              id: "doctor_1",
              username: "dr_smith",
              email: "dr_smith@example.com",
              role: "doctor",
              name: "Dr. Sarah Smith",
              createdAt: new Date().toISOString(),
              specialization: "Psychiatry",
              availability: true,
            },
            {
              id: "doctor_2",
              username: "dr_johnson",
              email: "dr_johnson@example.com",
              role: "doctor",
              name: "Dr. Michael Johnson",
              createdAt: new Date().toISOString(),
              specialization: "Psychology",
              availability: true,
            },
            {
              id: "doctor_3",
              username: "dr_patel",
              email: "dr_patel@example.com",
              role: "doctor",
              name: "Dr. Priya Patel",
              createdAt: new Date().toISOString(),
              specialization: "Clinical Psychology",
              availability: false,
            },
            {
              id: "doctor_4",
              username: "dr_martinez",
              email: "dr_martinez@example.com",
              role: "doctor",
              name: "Dr. Carlos Martinez",
              createdAt: new Date().toISOString(),
              specialization: "Neuropsychology",
              availability: true,
            },
          ];
          setAvailableDoctors(mockDoctors);
        }
      });

      newSocket.on("disconnected", () => {
        setIsConnected(false);
        console.log("Socket disconnected");
      });

      newSocket.on("new_message", (message) => {
        console.log("New message received:", message);
        setMessages((prev) => [...prev, message]);
      });

      return () => {
        newSocket.disconnect();
      };
    }
  }, [authState.isAuthenticated, authState.user]);

  const sendMessage = (receiverId, message) => {
    if (socket && authState.user) {
      const messageData = {
        senderId: authState.user.id,
        receiverId,
        message,
      };
      socket.sendMessage(messageData);
    }
  };

  return (
    <SocketContext.Provider
      value={{ isConnected, messages, sendMessage, availableDoctors }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};
