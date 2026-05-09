import { useState } from 'react';
import './Sidebar.css';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  userAddress?: string;
  userRole?: string;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊' },
  { id: 'voters', label: 'Voters', icon: '👥' },
  { id: 'proposals', label: 'Proposals', icon: '📋' },
  { id: 'myvotes', label: 'My Votes', icon: '✅' },
  { id: 'delegates', label: 'Delegates', icon: '🤝' },
];

const adminMenuItems = [
  { id: 'admin', label: 'Admin', icon: '⚙️' },
  { id: 'settings', label: 'Settings', icon: '🔧' },
];

export function Sidebar({ currentPage, onNavigate, userAddress, userRole }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

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
          <div className="nav-section-title">{!isCollapsed && 'Main'}</div>
          {menuItems.map(item => (
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

        {userRole === 'Admin' && (
          <div className="nav-section">
            <div className="nav-section-title">{!isCollapsed && 'Admin'}</div>
            {adminMenuItems.map(item => (
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
        )}
      </nav>

      <div className="sidebar-footer">
        <button className="disconnect-btn" title={isCollapsed ? 'Disconnect' : ''}>
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
