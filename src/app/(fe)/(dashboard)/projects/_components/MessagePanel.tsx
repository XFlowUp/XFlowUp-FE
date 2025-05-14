import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Send, Paperclip, Smile } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const sampleMessages = [
  {
    id: 1,
    sender: 'John Doe',
    avatar: '/avatars/john.jpg',
    content: 'Bạn đã kiểm tra API mới chưa? Tôi nghĩ chúng ta cần cập nhật documentation.',
    timestamp: '10:30 AM',
    isMe: false,
  },
  {
    id: 2,
    sender: 'You',
    avatar: '/avatars/you.jpg',
    content: 'Vâng, tôi đang xem xét. Sẽ update trong buổi họp tiếp theo.',
    timestamp: '10:32 AM',
    isMe: true,
  },
  {
    id: 3,
    sender: 'Sarah Kim',
    avatar: '/avatars/sarah.jpg',
    content: 'Team, chúng ta cần hoàn thành service authentication trước thứ 6 này.',
    timestamp: '10:45 AM',
    isMe: false,
  },
  {
    id: 4,
    sender: 'You',
    avatar: '/avatars/you.jpg',
    content: 'Tôi đã push code lên repository rồi. Mọi người review giúp nhé!',
    timestamp: '11:15 AM',
    isMe: true,
  },
  {
    id: 5,
    sender: 'Mike Chen',
    avatar: '/avatars/mike.jpg',
    content: 'Có ai gặp lỗi khi deploy service mới không? Tôi đang bị stuck.',
    timestamp: '11:30 AM',
    isMe: false,
  },
];

type MessagePanelProps = {
  projectSlug?: string;
};

export default function MessagePanel({ projectSlug }: MessagePanelProps) {
  const [showMessages, setShowMessages] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState(sampleMessages);
  const panelRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateMaxHeight = () => {
      if (panelRef.current) {
        const headerHeight = 64;
        const topGap = 80;
        const maxHeight = window.innerHeight - headerHeight - topGap;
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
    }
  }, [showMessages, messages]);

  const handleSendMessage = () => {
    if (messageText.trim() === '') return;

    const newMessage = {
      id: messages.length + 1,
      sender: 'You',
      avatar: '/avatars/you.jpg',
      content: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true,
    };

    setMessages([...messages, newMessage]);
    setMessageText('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div
      ref={panelRef}
      className={`bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 w-80 border rounded-t-md shadow-lg transition-all duration-300 ease-in-out ${
        showMessages ? 'h-[calc(100vh-144px)]' : 'h-10'
      }`}
      style={{
        zIndex: 10,
        transform: showMessages ? 'translateY(0)' : 'translateY(calc(100% - 40px))',
      }}
    >
      <div
        className="px-4 py-1 flex items-center justify-between cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
        onClick={() => setShowMessages(!showMessages)}
      >
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          <h3 className="font-medium">Messages</h3>
        </div>
        <ChevronDown
          className={`h-4 w-4 transition-transform ${showMessages ? 'rotate-0' : 'rotate-180'}`}
        />
      </div>

      {showMessages && (
        <div className="flex flex-col h-[calc(100%-41px)]">
          <div className="overflow-y-auto p-2 flex-grow">
            {messages.map(message => (
              <div
                key={message.id}
                className={`mb-4 flex ${message.isMe ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`flex max-w-[85%] ${message.isMe ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <Avatar className={`h-8 w-8 flex-shrink-0 ${message.isMe ? 'ml-2' : 'mr-2'}`}>
                    <AvatarImage src={message.avatar} />
                    <AvatarFallback>{message.sender.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center mb-1">
                      <span
                        className={`text-xs text-gray-500 ${message.isMe ? 'mr-2' : 'ml-0 mr-2'}`}
                      >
                        {message.sender}
                      </span>
                      <span className="text-xs text-gray-400">{message.timestamp}</span>
                    </div>
                    <div
                      className={`rounded-lg px-3 py-2 ${
                        message.isMe
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 border-t border-gray-200 dark:border-gray-700 mt-auto">
            <div className="flex items-center gap-2">
              <Input
                type="text"
                placeholder="Nhập tin nhắn..."
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
      )}
    </div>
  );
}
