import { Search } from 'lucide-react';
import { UserListItem } from './UserListItem';

export const Sidebar = ({ users, activeUserId, onSelect, searchQuery, onSearchChange }) => (
  <div className="flex flex-col h-full" style={{ backgroundColor: '#FCFAF6' }}>
    <div className="px-4 pt-5 pb-3 flex-shrink-0" style={{ backgroundColor: '#FCFAF6' }}>
      <h2 className="text-2xl font-semibold mb-3" style={{ color: '#211F1C', fontFamily: "'Fraunces', serif" }}>
        Messages
      </h2>
      <div className="relative">
        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: '#A39A8D' }} />
        <input
          type="text"
          placeholder="Search.."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-xl text-[14px] focus:outline-none transition-colors"
          style={{ backgroundColor: '#F1ECE3', color: '#211F1C', fontFamily: "'Inter', sans-serif" }}
        />
      </div>
    </div>
    <div className="flex-1 overflow-y-auto px-2 pb-2 space-y-0.5">
      {users.length > 0 ? (
        users.map((user) => (
          <UserListItem key={user.id} user={user} isSelected={user.id === activeUserId} onSelect={onSelect} />
        ))
      ) : (
        <div className="p-6 text-center text-sm" style={{ color: '#9A9186', fontFamily: "'Inter', sans-serif" }}>
          No one matches "{searchQuery}"
        </div>
      )}
    </div>
  </div>
);