import { useState } from 'react';
import './Sidebar.css';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  userAddress?: string;
  userRole?: string;
  onDisconnect?: () => void;
}

const voterMenuItems = [
  { id: 'Dashboard', label: 'Dashboard', icon: '📊' },
  { id: 'Proposals', label: 'Proposals', icon: '📋' },
  { id: 'My Votes', label: 'My Votes', icon: '✅' },
  { id: 'Delegates', label: 'Delegates', icon: '🤝' },
];

const chairpersonMenuItems = [
  { id: 'Voters', label: 'Give Right to Vote', icon: '👥' },
  { id: 'Proposals', label: 'Proposals', icon: '📋' },
];

export function Sidebar({ currentPage, onNavigate, userAddress, userRole, onDisconnect }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const activeMenuItems = userRole === 'chairperson' ? chairpersonMenuItems : voterMenuItems;
  const sectionTitle = userRole === 'chairperson' ? 'Chairperson' : 'Main';

  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="logo">
          <span className="logo-icon">🔗</span>
          {!isCollapsed && <span className="logo-text">BlockVote</span>}
        </div>
        <button 
          className="collapse-btn"
          onClick={() => setIsCollapsed(!isCollapsed)}
          title={isCollapsed ? 'Expand' : 'Collapse'}
        >
          {isCollapsed ? '→' : '←'}
        </button>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-section">
          <div className="nav-section-title">{!isCollapsed && sectionTitle}</div>
          {activeMenuItems.map(item => (
            <button
              key={item.id}
              className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
              onClick={() => onNavigate(item.id)}
              title={isCollapsed ? item.label : ''}
            >
              <span className="nav-icon">{item.icon}</span>
              {!isCollapsed && <span className="nav-label">{item.label}</span>}
            </button>
          ))}
        </div>
      </nav>

      <div className="sidebar-footer">
        <button className="disconnect-btn" title={isCollapsed ? 'Disconnect' : ''} onClick={onDisconnect}>
          <span className="icon">🔌</span>
          {!isCollapsed && <span>Disconnect</span>}
        </button>
        {userAddress && !isCollapsed && (
          <div className="user-address" title={userAddress}>
            {userAddress.slice(0, 6)}...{userAddress.slice(-4)}
          </div>
        )}
      </div>
    </aside>
  );
}
