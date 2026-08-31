import { CheckCheck } from "lucide-react";

export const MessageBubble = ({ message, color, isFirstInGroup, isLastInGroup }) => {
    const isMe = message.sender === 'me';
    return (
        <div className={`flex ${isMe ? 'justify-end' : 'justify-start'} ${isFirstInGroup ? 'mt-3' : 'mt-1'}`}>
            <div className="max-w-[78%] sm:max-w-[65%] flex flex-col">
                <div
                    className="px-4 py-2.5 text-[14.5px] leading-relaxed shadow-sm"
                    style={{
                        fontFamily: "'Inter', sans-serif",
                        color: isMe ? '#FBFAF7' : '#211F1C',
                        backgroundColor: isMe ? '#24544A' : '#FFFFFF',
                        border: isMe ? 'none' : '1px solid #EBE6DC',
                        borderLeft: !isMe ? `3px solid ${color}` : undefined,
                        borderRadius: isMe
                            ? `18px 18px ${isLastInGroup ? '4px' : '18px'} 18px`
                            : `18px 18px 18px ${isLastInGroup ? '4px' : '18px'}`,
                    }}
                >
                    <p className="whitespace-pre-wrap break-words">{message.text}</p>
                </div>
                {isLastInGroup && (
                    <span
                        className={`text-[10.5px] mt-1 px-1 flex items-center gap-1 ${isMe ? 'self-end' : 'self-start'}`}
                        style={{ color: '#A39A8D', fontFamily: "'Inter', sans-serif" }}
                    >
                        {message.timestamp}
                        {isMe && <CheckCheck size={12} style={{ color: '#7C9C93' }} />}
                    </span>
                )}
            </div>
        </div>
    );
};