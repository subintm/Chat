import React, { useState, useEffect, useRef, useMemo } from 'react';
import { ChatPanel } from './components/ChatPanel';
import { Sidebar } from './components/Sidebar';
import { INITIAL_USERS } from './service/api';
import { getFormattedTime } from './service/utils';

export default function App() {
  const [users, setUsers] = useState(INITIAL_USERS);
  const [activeUserId, setActiveUserId] = useState(INITIAL_USERS[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [inputMessage, setInputMessage] = useState('');
  const [currentView, setCurrentView] = useState('list'); 
  const [typingUserId, setTypingUserId] = useState(null);

  const messagesEndRef = useRef(null);

  const activeUser = users.find((u) => u.id === activeUserId);
  const isTyping = activeUserId === typingUserId;

  const filteredUsers = useMemo(
    () => users.filter((u) => u.name.toLowerCase().includes(searchQuery.toLowerCase())),
    [users, searchQuery]
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeUser?.messages, isTyping]);

  const selectConversation = (id) => {
    setActiveUserId(id);
    setCurrentView('chat');
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const messageText = inputMessage.trim();
    const targetUserId = activeUserId;
    const newMessage = {
      id: Date.now().toString(),
      sender: 'me',
      text: messageText,
      timestamp: getFormattedTime()
    };

    setUsers((prevUsers) =>
      prevUsers.map((u) => (u.id === targetUserId ? { ...u, messages: [...u.messages, newMessage] } : u))
    );
    setInputMessage('');
    setTypingUserId(targetUserId);

    setTimeout(() => {
      const replyMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'them',
        text: `Got your message: "${messageText}"`,
        timestamp: getFormattedTime(),
      };
      setUsers((prevUsers) =>
        prevUsers.map((u) => (u.id === targetUserId ? { ...u, messages: [...u.messages, replyMessage] } : u))
      );
      setTypingUserId((current) => (current === targetUserId ? null : current));
    }, 1500);
  };

  return (
    <div className="h-dvh w-full" style={{ backgroundColor: '#EFEAE0', fontFamily: "'Inter', sans-serif" }}>
      <div className="h-full w-full md:p-6 md:flex md:items-center md:justify-center">
        <div className="h-full w-full md:max-w-6xl md:h-[85vh] md:rounded-[28px] overflow-hidden flex md:shadow-2xl md:border" style={{ borderColor: '#E2DBCC' }}>
          {/* MOBILE: sliding single-pane view */}
          <div className="relative flex-1 h-full overflow-hidden md:hidden">
            <div
              className="absolute inset-0 transition-transform duration-300 ease-out"
              style={{ transform: currentView === 'chat' ? 'translateX(-100%)' : 'translateX(0)' }}
            >
              <Sidebar
                users={filteredUsers}
                activeUserId={activeUserId}
                onSelect={selectConversation}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
              />
            </div>
            <div
              className="absolute inset-0 transition-transform duration-300 ease-out"
              style={{ transform: currentView === 'chat' ? 'translateX(0)' : 'translateX(100%)' }}
            >
              <ChatPanel
                user={activeUser}
                isTyping={isTyping}
                inputMessage={inputMessage}
                setInputMessage={setInputMessage}
                onSend={sendMessage}
                endRef={messagesEndRef}
                showBack
                onBack={() => setCurrentView('list')}
              />
            </div>
          </div>

          {/* DESKTOP: fixed split view */}
          <div className="hidden md:flex w-full h-full">
            <div className="w-[340px] flex-shrink-0" style={{ borderRight: '1px solid #E2DBCC' }}>
              <Sidebar
                users={filteredUsers}
                activeUserId={activeUserId}
                onSelect={selectConversation}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
              />
            </div>
            <ChatPanel
              user={activeUser}
              isTyping={isTyping}
              inputMessage={inputMessage}
              setInputMessage={setInputMessage}
              onSend={sendMessage}
              endRef={messagesEndRef}
              showBack={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}