import { createClient } from '@liveblocks/client';
import { createRoomContext } from '@liveblocks/react';

const client = createClient({
  publicApiKey: process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY || '',
});

export type Presence = {
  cursor: {
    x: number;
    y: number;
    flowX: number;
    flowY: number;
  } | null;
  name: string;
  nodes: any[];
  edges: any[];
};

export type Storage = {
  nodes: any[];
  edges: any[];
};

type UserMeta = {
  id: string;
  info: {
    name: string;
  };
};

type RoomEvent = {
  type: 'NOTIFICATION';
  message: string;
};

const { RoomProvider, useMyPresence, useUpdateMyPresence, useSelf, useOthers } = createRoomContext<
  Presence,
  Storage,
  UserMeta,
  RoomEvent
>(client);

export { RoomProvider, useMyPresence, useUpdateMyPresence, useSelf, useOthers };
