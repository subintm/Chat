export const INITIAL_USERS = [
  {
    id: '1',
    name: 'Sneha',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
    status: 'online',
    messages: [
      { id: 'm1', sender: 'them', text: 'Hey! How are you doing?', timestamp: '10:00 AM' },
      { id: 'm2', sender: 'me', text: 'Hey Sneha! I’m doing pretty good 😊 How about you?', timestamp: '10:02 AM' },
      { id: 'm3', sender: 'them', text: 'I’m good too! Just relaxing a bit. What are you up to?', timestamp: '10:05 AM' },
    ],
  },
  {
    id: '2',
    name: 'Vignesh',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    status: 'offline',
    messages: [
      { id: 'm4', sender: 'them', text: 'Hey! Did you have lunch?', timestamp: 'Yesterday' },
      { id: 'm5', sender: 'me', text: 'Not yet 😅 I’m still deciding what to eat.', timestamp: 'Yesterday' },
      { id: 'm6', sender: 'them', text: 'Haha same here! Let me know if you find something good.', timestamp: 'Yesterday' },
    ],
  },
  {
    id: '3',
    name: 'Subin',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    status: 'online',
    messages: [
      { id: 'm7', sender: 'them', text: 'Hey! Are you free this evening?', timestamp: '08:30 AM' },
      { id: 'm8', sender: 'me', text: 'Yeah, I think so! What’s up?', timestamp: '08:32 AM' },
      { id: 'm9', sender: 'them', text: 'Nothing special 😄 Thought we could hang out for a while.', timestamp: '08:35 AM' },
    ],
  },
  {
    id: '4',
    name: 'Sweatha',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
    status: 'offline',
    messages: [
      { id: 'm10', sender: 'them', text: 'Hey! Long time no talk 😊', timestamp: 'Mon' },
      { id: 'm11', sender: 'me', text: 'I know! We’ve both been so busy lately.', timestamp: 'Mon' },
      { id: 'm12', sender: 'them', text: 'Exactly! We should catch up sometime soon.', timestamp: 'Mon' },
    ],
  },
];
