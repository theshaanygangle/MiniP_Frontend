import React, { useState, useEffect, useRef } from 'react';
import { useSocket } from '@/context/SocketContext';
import { useAuth } from '@/context/AuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Send } from 'lucide-react';
import ChatMessage from './ChatMessage';
import { ScrollArea } from '@/components/ui/scroll-area';

const ChatWindow = ({ partner }) => {
  const { authState } = useAuth();
  const { messages, sendMessage } = useSocket();
  const [messageInput, setMessageInput] = useState('');
  const scrollAreaRef = useRef(null);

  const conversationMessages = messages.filter(msg =>
    (msg.senderId === authState.user?.id && msg.receiverId === partner.id) ||
    (msg.senderId === partner.id && msg.receiverId === authState.user?.id)
  );

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [conversationMessages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageInput.trim()) return;

    sendMessage(partner.id, messageInput);
    setMessageInput('');
  };

  return (
    <Card className="flex flex-col h-full border-0 shadow-none">
      <CardHeader className="bg-teal-50 rounded-t-xl p-4 border-b">
        <CardTitle className="text-xl font-medium text-teal-800">
          Chat with {partner.name}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-grow p-4 overflow-hidden">
        <ScrollArea className="h-full pr-4" ref={scrollAreaRef}>
          {conversationMessages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-500">
              <p className="text-center">No messages yet.</p>
              <p className="text-center">Send a message to start the conversation.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {conversationMessages.map((message) => (
                <ChatMessage
                  key={message.id}
                  message={message}
                  partnerName={partner.name}
                />
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <form onSubmit={handleSendMessage} className="flex w-full space-x-2">
          <Input
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-grow input-focus-effect"
          />
          <Button
            type="submit"
            size="icon"
            className="bg-teal-500 hover:bg-teal-600 text-white"
            disabled={!messageInput.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};

export default ChatWindow;
