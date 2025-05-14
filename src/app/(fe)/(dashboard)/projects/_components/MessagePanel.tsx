import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Send, Paperclip, Smile } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageSquareIcon } from '@/components/ui/message-square';
import { useChannelStateContext, useChatContext } from 'stream-chat-react';
import useAuth from '@/shared/hooks/useAuth';

type MessagePanelProps = {
  projectSlug?: string;
};

type OptimisticMessage = {
  id: string;
  text: string;
  user: {
    id: string;
    name: string;
    image?: string;
  };
  created_at: Date;
  isPending: boolean;
};

export default function MessagePanel({ projectSlug }: MessagePanelProps) {
  const [showMessages, setShowMessages] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [optimisticMessages, setOptimisticMessages] = useState<OptimisticMessage[]>([]);
  const panelRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { user } = useAuth();
  const { client } = useChatContext();
  const { channel, messages: allMessages } = useChannelStateContext();

  useEffect(() => {
    const updateMaxHeight = () => {
      if (panelRef.current) {
        const headerHeight = 64;
        const bottomGap = 20;
        const maxHeight = window.innerHeight - headerHeight - bottomGap;
        panelRef.current.style.maxHeight = `${maxHeight}px`;
      }
    };

    updateMaxHeight();
    window.addEventListener('resize', updateMaxHeight);
    return () => window.removeEventListener('resize', updateMaxHeight);
  }, []);

  useEffect(() => {
    if (showMessages) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      inputRef.current?.focus();
    }
  }, [showMessages, allMessages, optimisticMessages]);

  const handleSendMessage = async () => {
    if (messageText.trim() === '' || !channel || !user) return;

    const tempId = `temp-${Date.now()}`;
    const optimisticMessage: OptimisticMessage = {
      id: tempId,
      text: messageText,
      user: {
        id: user.email,
        name: user.name,
        image: user.profile_pic_url || undefined,
      },
      created_at: new Date(),
      isPending: true,
    };

    setOptimisticMessages(prev => [...prev, optimisticMessage]);
    setMessageText('');

    try {
      await channel.sendMessage({
        text: messageText,
      });
      setOptimisticMessages(prev => prev.filter(msg => msg.id !== tempId));
    } catch (error) {
      console.error('Error sending message:', error);
      setOptimisticMessages(prev => prev.filter(msg => msg.id !== tempId));
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleMessages = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.message-panel-header')) {
      setShowMessages(!showMessages);
    }
  };

  const allMessagesWithOptimistic = [...optimisticMessages, ...(allMessages || [])].sort(
    (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
  );

  return (
    <div
      ref={panelRef}
      className={`fixed bottom-0 right-4 w-80 md:w-96 rounded-t-md border border-gray-200 bg-white shadow-lg transition-all duration-300 ease-in-out dark:border-gray-700 dark:bg-gray-800 ${
        showMessages ? 'h-[calc(100vh-144px)]' : 'h-10'
      }`}
      style={{
        zIndex: 50,
      }}
    >
      <div
        className="flex cursor-pointer items-center justify-between px-4 py-2 border-b border-gray-200 dark:border-gray-700 message-panel-header"
        onClick={toggleMessages}
      >
        <div className="flex items-center gap-2">
          <MessageSquareIcon size={16} />
          <h3 className="font-medium">Messages</h3>
        </div>
        <ChevronDown
          className={`h-4 w-4 transition-transform ${showMessages ? 'rotate-180' : 'rotate-0'}`}
        />
      </div>

      <div className="flex flex-col h-[calc(100%-40px)] overflow-hidden">
        <div
          className={`flex flex-col h-full ${showMessages ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
          <div className="overflow-y-auto p-3 flex-grow">
            {allMessagesWithOptimistic.map(message => {
              const isMe =
                'isPending' in message
                  ? message.user.id === user?.email
                  : message.user?.id === client.user?.id;
              const isPending = 'isPending' in message && message.isPending;
              return (
                <div
                  key={message.id}
                  className={`mb-4 flex ${isMe ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex max-w-[85%] ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
                    <Avatar className={`h-8 w-8 flex-shrink-0 ${isMe ? 'ml-2' : 'mr-2'}`}>
                      <AvatarImage src={message.user?.image} alt={message.user?.name} />
                      <AvatarFallback>{message.user?.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center mb-1">
                        <span className={`text-xs text-gray-500 ${isMe ? 'mr-2' : 'ml-0 mr-2'}`}>
                          {message.user?.name}
                        </span>
                        <span className="text-xs text-gray-400">
                          {message.created_at.toLocaleString()}
                        </span>
                      </div>
                      <div
                        className={`rounded-lg px-3 py-2 transition-opacity duration-300 ${
                          isMe
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                        } ${isPending ? 'opacity-50' : 'opacity-100'}`}
                      >
                        <p className="text-sm">{message.text}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 border-t border-gray-200 dark:border-gray-700 mt-auto sticky bottom-0 bg-white dark:bg-gray-800">
            <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
              <Input
                ref={inputRef}
                type="text"
                placeholder="Type a message..."
                value={messageText}
                onChange={e => setMessageText(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-grow"
              />
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" type="button">
                <Paperclip className="h-4 w-4 text-gray-500" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" type="button">
                <Smile className="h-4 w-4 text-gray-500" />
              </Button>
              <Button
                variant="default"
                size="icon"
                className="h-8 w-8 rounded-full bg-blue-500 hover:bg-blue-600"
                onClick={handleSendMessage}
                type="button"
              >
                <Send className="h-4 w-4 text-white" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
