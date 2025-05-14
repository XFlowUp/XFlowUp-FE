'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { Channel, StreamChat } from 'stream-chat';
import useStreamToken from '../api/queries/useStreamToken';
import useAuth from '../hooks/useAuth';
import { Chat, Channel as StreamChatChannel } from 'stream-chat-react';

type StreamProviderProps = {
  children: React.ReactNode;
  projectSlug: string;
};

type StreamContextType = {
  token: string;
  client: StreamChat;
};

const StreamContext = React.createContext<StreamContextType | undefined>(undefined);
export default function StreamProvider({ children, projectSlug }: StreamProviderProps) {
  const streamQuery = useStreamToken();
  const { user } = useAuth();
  const client = useMemo(() => StreamChat.getInstance(process.env.NEXT_PUBLIC_STREAM_KEY!), []);

  const [channel, setChannel] = useState<ReturnType<typeof client.channel> | null>(null);

  useEffect(() => {
    if (streamQuery.data?.token) {
      client.connectUser(
        {
          id: streamQuery.data.user_id,
          name: user?.name,
          image: user?.profile_pic_url ?? undefined,
        },
        streamQuery.data.token
      );
      const channel = client.channel('messaging', projectSlug);
      setChannel(channel as Channel);
    }
  }, [streamQuery.data?.token, user]);

  return (
    <StreamContext.Provider value={{ token: streamQuery.data?.token ?? '', client }}>
      <Chat client={client}>
        <StreamChatChannel channel={channel!}>{children}</StreamChatChannel>
      </Chat>
    </StreamContext.Provider>
  );
}

export const useStream = () => {
  const context = React.useContext(StreamContext);
  if (context === undefined) {
    throw new Error('useStream must be used within a StreamProvider');
  }
  return context;
};
