import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Send, X, FileIcon, Download, Play } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageSquareIcon } from '@/components/ui/message-square';
import { useChannelStateContext, useChatContext } from 'stream-chat-react';
import useAuth from '@/shared/hooks/useAuth';
import EmojiPicker, { EmojiClickData, EmojiStyle, Theme } from 'emoji-picker-react';
import { AnimatePresence, motion } from 'motion/react';
import { AttachFileIcon } from '@/components/ui/attach-file';
import { SmileIcon } from '@/components/ui/smile';

interface MessageAttachment {
  type: string;
  asset_url?: string;
  title?: string;
  file_size?: number;
  mime_type?: string;
  image_url?: string;
  thumb_url?: string;
}

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
  attachments?: MessageAttachment[];
};

type FilePreview = {
  id: string;
  file: File;
  previewUrl?: string;
  type: 'file' | 'image' | 'video';
  name: string;
  size: number;
};

const isSameDay = (date1: Date, date2: Date) => {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
};

const formatDate = (date: Date) => {
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  if (isSameDay(date, today)) {
    return 'Today';
  } else if (isSameDay(date, yesterday)) {
    return 'Yesterday';
  } else {
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }
};

const formatTime = (date: Date) => {
  return date.toLocaleTimeString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

const formatFileSize = (bytes: number) => {
  if (bytes < 1024) return bytes + ' bytes';
  else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
  else return (bytes / 1048576).toFixed(1) + ' MB';
};

const getMessageRounding = (text: string) => {
  if (!text) return 'rounded-lg';

  if (!text.includes('\n') && text.length < 25) {
    return 'rounded-full';
  }

  if (text.length < 100) {
    return 'rounded-2xl';
  }

  return 'rounded-lg';
};

export default function MessagePanel() {
  const [showMessages, setShowMessages] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [optimisticMessages, setOptimisticMessages] = useState<OptimisticMessage[]>([]);
  const [fileUploads, setFileUploads] = useState<FilePreview[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const emojiButtonRef = useRef<HTMLButtonElement>(null);
  const emojiPickerRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showEmojiPicker &&
        emojiPickerRef.current &&
        emojiButtonRef.current &&
        !emojiPickerRef.current.contains(event.target as Node) &&
        !emojiButtonRef.current.contains(event.target as Node)
      ) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showEmojiPicker]);

  const handleSendMessage = async () => {
    if ((messageText.trim() === '' && fileUploads.length === 0) || !channel || !user) return;

    setIsUploading(true);
    const tempId = `temp-${Date.now()}`;

    const optimisticAttachments: MessageAttachment[] = fileUploads.map(upload => ({
      type: upload.type === 'video' ? 'video' : upload.type,
      title: upload.name,
      file_size: upload.size,
      mime_type: upload.file.type,
      image_url: upload.type === 'image' ? upload.previewUrl : undefined,
      asset_url: upload.type === 'video' ? upload.previewUrl : undefined,
    }));

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
      attachments: optimisticAttachments.length > 0 ? optimisticAttachments : undefined,
    };

    setOptimisticMessages(prev => [...prev, optimisticMessage]);
    setMessageText('');
    const filesToUpload = [...fileUploads];
    setFileUploads([]);

    const attachments: MessageAttachment[] = [];

    try {
      for (const upload of filesToUpload) {
        try {
          const file = upload.file;
          const response = await channel.sendFile(file);

          const attachment: MessageAttachment = {
            type: upload.type === 'video' ? 'video' : upload.type,
            asset_url: response.file,
            title: upload.name,
            file_size: upload.size,
            mime_type: upload.file.type,
          };

          if (upload.type === 'image') {
            attachment.image_url = response.file;
          }

          attachments.push(attachment);
        } catch (error) {
          console.error('Error uploading file:', error);
        }
      }

      await channel.sendMessage({
        text: messageText,
        attachments: attachments.length > 0 ? attachments : undefined,
      });

      setOptimisticMessages(prev => prev.filter(msg => msg.id !== tempId));
    } catch (error) {
      console.error('Error sending message:', error);
      setOptimisticMessages(prev => prev.filter(msg => msg.id !== tempId));
    } finally {
      setIsUploading(false);
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

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles: FilePreview[] = [];

      for (const file of Array.from(e.target.files)) {
        const id = `file-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
        const isImage = file.type.startsWith('image/');
        const isVideo = file.type.startsWith('video/');

        const preview: FilePreview = {
          id,
          file,
          type: isImage ? 'image' : isVideo ? 'video' : 'file',
          name: file.name,
          size: file.size,
        };

        if (isImage || isVideo) {
          preview.previewUrl = URL.createObjectURL(file);
        }

        newFiles.push(preview);
      }

      setFileUploads(prev => [...prev, ...newFiles]);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeFile = (id: string) => {
    setFileUploads(prev => {
      const fileToRemove = prev.find(file => file.id === id);

      if (fileToRemove?.previewUrl) {
        URL.revokeObjectURL(fileToRemove.previewUrl);
      }

      return prev.filter(file => file.id !== id);
    });
  };

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setMessageText(prev => prev + emojiData.emoji);
    setShowEmojiPicker(false);
  };

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const renderFilePreview = (file: FilePreview) => {
    return (
      <div
        key={file.id}
        className="relative flex items-center p-2 mb-2 rounded-md bg-gray-100 dark:bg-gray-700"
      >
        {file.type === 'image' && file.previewUrl ? (
          <div className="w-12 h-12 mr-3 rounded-md overflow-hidden">
            <img src={file.previewUrl} alt={file.name} className="w-full h-full object-cover" />
          </div>
        ) : file.type === 'video' && file.previewUrl ? (
          <div className="w-12 h-12 mr-3 rounded-md overflow-hidden relative">
            <video
              src={file.previewUrl}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Play className="w-4 h-4 text-white" />
            </div>
          </div>
        ) : (
          <div className="w-12 h-12 mr-3 flex items-center justify-center rounded-md bg-gray-200 dark:bg-gray-600">
            <FileIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">{file.name}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{formatFileSize(file.size)}</p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 ml-2"
          onClick={() => removeFile(file.id)}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    );
  };

  const renderAttachment = (
    attachment: MessageAttachment,
    isMyMessage: boolean,
    isPending: boolean
  ) => {
    const isImage = attachment.type === 'image' || attachment.image_url;
    const isVideo =
      attachment.type === 'video' ||
      (attachment.mime_type && attachment.mime_type.startsWith('video/'));

    if (isImage) {
      return (
        <div className="mb-1 mt-1 rounded-md overflow-hidden">
          <img
            src={attachment.image_url || attachment.thumb_url}
            alt={attachment.title || 'Image attachment'}
            className="max-w-full h-auto rounded-md max-h-[300px] object-contain"
          />
        </div>
      );
    } else if (isVideo && attachment.asset_url) {
      return (
        <div className="mb-1 mt-1 rounded-md overflow-hidden relative">
          <video
            src={attachment.asset_url}
            className="w-full rounded-md max-h-[300px]"
            controls
            preload="metadata"
            poster={attachment.thumb_url}
            style={{ pointerEvents: isPending ? 'none' : 'auto' }}
          />
        </div>
      );
    } else {
      return (
        <div
          className={`flex items-center p-2 mb-1 mt-1 rounded-md ${isMyMessage ? 'bg-blue-500' : 'bg-gray-100 dark:bg-gray-700'}`}
        >
          <FileIcon
            className={`h-5 w-5 mr-2 ${isMyMessage ? 'text-white' : 'text-gray-500 dark:text-gray-400'}`}
          />
          <div className="flex-1 min-w-0 mr-2">
            <p
              className={`text-sm font-medium truncate ${isMyMessage ? 'text-white' : 'text-gray-800 dark:text-gray-200'}`}
            >
              {attachment.title}
            </p>
            {attachment.file_size && (
              <p
                className={`text-xs ${isMyMessage ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'}`}
              >
                {formatFileSize(attachment.file_size)}
              </p>
            )}
          </div>
          {attachment.asset_url && (
            <a
              href={attachment.asset_url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center w-8 h-8 rounded-full transition-colors ${
                isMyMessage
                  ? 'text-white hover:bg-blue-600'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
              title="Tải xuống"
              onClick={e => {
                if (isPending) {
                  e.preventDefault();
                }
              }}
              style={{
                pointerEvents: isPending ? 'none' : 'auto',
                opacity: isPending ? 0.6 : 1,
              }}
            >
              <Download className="h-4 w-4" />
            </a>
          )}
        </div>
      );
    }
  };

  const allMessagesWithOptimistic = [...optimisticMessages, ...(allMessages || [])].sort(
    (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
  );

  const groupedMessages: { date: Date; messages: any[] }[] = [];
  allMessagesWithOptimistic.forEach(message => {
    const messageDate = new Date(message.created_at);
    const lastGroup = groupedMessages[groupedMessages.length - 1];

    if (lastGroup && isSameDay(lastGroup.date, messageDate)) {
      lastGroup.messages.push(message);
    } else {
      groupedMessages.push({
        date: messageDate,
        messages: [message],
      });
    }
  });

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
            {groupedMessages.map((group, groupIndex) => (
              <div key={groupIndex} className="mb-4">
                <div className="flex justify-center my-3">
                  <div className="px-4 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs text-gray-500 dark:text-gray-400">
                    {formatDate(group.date)}
                  </div>
                </div>

                {group.messages.map((message: any) => {
                  const isMe =
                    'isPending' in message
                      ? message.user.id === user?.email
                      : message.user?.id === client.user?.id;
                  const isPending = 'isPending' in message && message.isPending;
                  const hasAttachments = message.attachments && message.attachments.length > 0;

                  return (
                    <div
                      key={message.id}
                      className={`mb-3 flex ${isMe ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`flex items-end max-w-[85%] ${isMe ? 'flex-row-reverse' : 'flex-row'}`}
                      >
                        <Avatar className={`h-8 w-8 flex-shrink-0 ${isMe ? 'ml-2' : 'mr-2'} mb-0`}>
                          <AvatarImage src={message.user?.image} alt={message.user?.name} />
                          <AvatarFallback>{message.user?.name?.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div
                            className={`flex items-center mb-1 text-xs ${isMe ? 'justify-end' : 'justify-start'}`}
                          >
                            <span
                              className={`text-gray-500 whitespace-nowrap ${isMe ? 'order-2' : 'order-1'}`}
                            >
                              {message.user?.name}
                            </span>
                            <span
                              className={`text-gray-400 mx-2 whitespace-nowrap ${isMe ? 'order-1' : 'order-2'}`}
                            >
                              {formatTime(new Date(message.created_at))}
                            </span>
                          </div>

                          {hasAttachments &&
                            message.attachments.map(
                              (attachment: MessageAttachment, index: number) => (
                                <div
                                  key={`att-${message.id}-${index}`}
                                  className={`transition-opacity duration-300 ${isPending ? 'opacity-80' : 'opacity-100'}`}
                                >
                                  {renderAttachment(attachment, isMe, isPending)}
                                </div>
                              )
                            )}

                          {message.text && (
                            <div
                              className={`${getMessageRounding(message.text)} px-3 py-2 transition-opacity duration-300 break-words ${
                                isMe
                                  ? 'bg-blue-500 text-white'
                                  : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                              } ${isPending ? 'opacity-80' : 'opacity-100'}`}
                              style={{ maxWidth: '100%', minWidth: 'min-content' }}
                            >
                              <p className="text-sm">{message.text}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 border-t border-gray-200 dark:border-gray-700 mt-auto sticky bottom-0 bg-white dark:bg-gray-800">
            {fileUploads.length > 0 && (
              <div className="mb-2 max-h-32 overflow-y-auto p-1">
                {fileUploads.map(file => renderFilePreview(file))}
              </div>
            )}
            <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
              <Input
                ref={inputRef}
                type="text"
                placeholder="Type a message..."
                value={messageText}
                onChange={e => setMessageText(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-grow"
                disabled={isUploading}
              />
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileChange}
                style={{ display: 'none' }}
                multiple
              />
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full"
                type="button"
                onClick={openFilePicker}
                disabled={isUploading}
              >
                <AttachFileIcon className="h-4 w-4 text-gray-500" />
              </Button>
              <div className="relative">
                <Button
                  ref={emojiButtonRef}
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  type="button"
                  onClick={toggleEmojiPicker}
                  disabled={isUploading}
                >
                  <SmileIcon className="h-4 w-4 text-gray-500" />
                </Button>
                <AnimatePresence>
                  {showEmojiPicker && (
                    <motion.div
                      ref={emojiPickerRef}
                      className="absolute bottom-12 right-0 z-50"
                      initial={{ opacity: 0, scale: 0.9, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: 10 }}
                      transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 25,
                        duration: 0.2,
                      }}
                    >
                      <EmojiPicker
                        onEmojiClick={handleEmojiClick}
                        lazyLoadEmojis={true}
                        searchPlaceholder="Search emoji..."
                        emojiStyle={EmojiStyle.APPLE}
                        theme={Theme.AUTO}
                        width={320}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <Button
                variant="default"
                size="icon"
                className="h-8 w-8 rounded-full bg-blue-500 hover:bg-blue-600"
                onClick={handleSendMessage}
                type="button"
                disabled={isUploading || (messageText.trim() === '' && fileUploads.length === 0)}
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
