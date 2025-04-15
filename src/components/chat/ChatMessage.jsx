import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { CheckCheck } from 'lucide-react';

const ChatMessage = ({ message, partnerName }) => {
  const { authState } = useAuth();

  const isOwnMessage = message.senderId === authState.user?.id;

  return (
    <div className={cn(
      "flex flex-col mb-4",
      isOwnMessage ? "items-end" : "items-start"
    )}>
      <div className={cn(
        "chat-bubble",
        isOwnMessage
          ? "chat-bubble-patient bg-blue-100 text-foreground"
          : "chat-bubble-doctor bg-teal-100 text-foreground"
      )}>
        <p className="mb-1">{message.message}</p>
        <div className="flex justify-end items-center space-x-1 text-xs text-gray-500">
          <span>{format(new Date(message.timestamp), 'h:mm a')}</span>
          {isOwnMessage && message.read && <CheckCheck className="h-3 w-3" />}
        </div>
      </div>
      <div className="mt-1 text-xs text-gray-500">
        {!isOwnMessage && <span>{partnerName}</span>}
      </div>
    </div>
  );
};

export default ChatMessage;
