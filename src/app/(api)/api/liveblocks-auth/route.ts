import { Liveblocks } from '@liveblocks/node';

const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY!,
});

export async function POST(request: Request) {
  const { projectSlug } = await request.json();
  const user = {
    id: '123',
    metadata: {
      name: 'John Doe',
      avatar: 'https://liveblocks.io/avatar/john-doe.png',
      colors: ['red', 'blue', 'green'],
    },
    organization: '123',
    group: '123',
  };

  const session = liveblocks.prepareSession(user.id, {
    userInfo: {
      name: user.metadata.name,
      avatar: user.metadata.avatar,
      colors: user.metadata.colors,
    },
  });

  session.allow(`project:${projectSlug}`, session.FULL_ACCESS);

  const { status, body } = await session.authorize();
  return new Response(body, { status });
}
