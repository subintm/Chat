import { threadColor } from '../service/utils';

export const UserListItem = ({ user, isSelected, onSelect }) => {
    const color = threadColor(user.id);
    const lastMessage = user.messages[user.messages.length - 1];
    
    return (
        <button
            onClick={() => onSelect(user.id)}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-colors duration-150 group ${
                isSelected ? 'bg-[#F1ECE3]' : 'hover:bg-[#F7F4EE]'
            }`}
        >
            <div className="relative flex-shrink-0">
                <div
                    className="w-12 h-12 rounded-full p-[2px]"
                    style={{ background: isSelected ? color : 'transparent' }}
                >
                    <img 
                        src={user.avatar} 
                        alt={user.name} 
                        className="w-full h-full rounded-full object-cover border-2 border-white" 
                    />
                </div>
                <span
                    className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white"
                    style={{ backgroundColor: user.status === 'online' ? '#3EB489' : '#B7AFA2' }}
                />
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline gap-2">
                    <h4 className="font-semibold text-[15px] truncate" style={{ color: '#211F1C', fontFamily: "'Inter', sans-serif" }}>
                        {user.name}
                    </h4>
                    {lastMessage && (
                        <span className="text-[11px] flex-shrink-0" style={{ color: '#9A9186' }}>
                            {lastMessage.timestamp}
                        </span>
                    )}
                </div>
                <p className="text-[13px] truncate" style={{ color: '#7C7468' }}>
                    {lastMessage 
                        ? (lastMessage.sender === 'me' ? `You: ${lastMessage.text}` : lastMessage.text) 
                        : 'No messages yet'}
                </p>
            </div>
        </button>
    );
};