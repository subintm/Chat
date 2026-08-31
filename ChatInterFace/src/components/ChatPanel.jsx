import React, { useState } from "react";
import { ArrowLeft, MoreVertical, Send, MessageCircleDashed, Phone, Video } from "lucide-react";
import { threadColor } from "../service/utils";
import { MessageBubble } from "./MessageBubble";
import { TypingIndicator } from "./TypingIndicator";

export const ChatPanel = ({ user, onBack, showBack, isTyping, inputMessage, setInputMessage, onSend, endRef }) => {
  const [isFocused, setIsFocused] = useState(false);

  const color = threadColor(user.id);

  // Group consecutive messages from the same sender for tighter, cleaner spacing
  const groups = [];
  user.messages.forEach((msg, idx) => {
    const prev = user.messages[idx - 1];
    if (prev && prev.sender === msg.sender) {
      groups[groups.length - 1].push(msg);
    } else {
      groups.push([msg]);
    }
  });

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      const isNearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 150;
      if (isNearBottom) {
        el.scrollTop = el.scrollHeight;
      }
    }
  }, [user.messages, isTyping]);

  return (
    <div className="flex-1 flex flex-col h-full min-w-0" style={{ backgroundColor: '#FAF8F4' }}>
      {/* Header */}
      <div
        className="flex items-center gap-3 px-4 py-3 flex-shrink-0"
        style={{ backgroundColor: '#FFFFFF', borderBottom: `1px solid #EBE6DC` }}
      >
        {showBack && (
          <button onClick={onBack} className="p-1 -ml-1 rounded-full active:bg-black/5 flex-shrink-0">
            <ArrowLeft size={20} style={{ color: '#211F1C' }} />
          </button>
        )}
        <div className="relative flex-shrink-0">
          <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover" style={{ border: `2px solid ${color}` }} />
          <span
            className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white"
            style={{ backgroundColor: user.status === 'online' ? '#3EB489' : '#B7AFA2' }}
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-[15px] truncate" style={{ color: '#211F1C', fontFamily: "'Fraunces', serif" }}>
            {user.name}
          </h3>
          <span className="text-[12px] capitalize" style={{ color: user.status === 'online' ? '#3EB489' : '#9A9186' }}>
            {isTyping ? 'typing\u2026' : user.status}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-full active:bg-black/5">
            <Phone size={20} className="text-[#54656F]" />
          </button>

          <button className="p-2 rounded-full active:bg-black/5">
            <Video size={20} className="text-[#54656F]" />
          </button>

          <button className="p-2 rounded-full active:bg-black/5">
            <MoreVertical size={20} className="text-[#54656F]" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-2" style={{ scrollbarWidth: 'thin' }}>
        {groups.map((group, gi) => (
          <div key={group[0].id}>
            {group.map((msg, mi) => (
              <MessageBubble
                key={msg.id}
                message={msg}
                color={color}
                isFirstInGroup={mi === 0}
                isLastInGroup={mi === group.length - 1}
              />
            ))}

          </div>
        ))}
        {isTyping && <TypingIndicator color={color} />}
        <div ref={endRef} />
      </div>

      {/* Composer */}
      <form onSubmit={onSend} className="flex items-center gap-2 px-3 py-3 flex-shrink-0" style={{ backgroundColor: '#FFFFFF', borderTop: '1px solid #EBE6DC' }}>
        <input
          type="text"
          placeholder={`Message ${user.name.split(' ')[0]}\u2026`}
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          className="flex-1 px-4 py-2.5 rounded-full text-[14.5px] focus:outline-none transition-colors"
          style={{
            backgroundColor: '#F3EFE7',
            color: '#211F1C',
            fontFamily: "'Inter', sans-serif",
            boxShadow: isFocused ? `0 0 0 2px ${color}55` : 'none'
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <button
          type="submit"
          disabled={!inputMessage.trim()}
          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all disabled:opacity-40"
          style={{ backgroundColor: '#24544A' }}
        >
          <Send size={16} style={{ color: '#FBFAF7' }} />
        </button>
      </form>
    </div>
  );
};