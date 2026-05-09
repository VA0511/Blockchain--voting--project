import './Header.css';

interface HeaderProps {
  title: string;
  subtitle?: string;
  userAddress?: string;
}

export function Header({ title, subtitle, userAddress }: HeaderProps) {
  return (
    <header className="header">
      <div className="header-left">
        <h1 className="header-title">{title}</h1>
        {subtitle && <p className="header-subtitle">{subtitle}</p>}
      </div>
      <div className="header-right">
        <div className="network-indicator">
          <div className="status-dot"></div>
          <span>Ethereum Sepolia</span>
        </div>
        {userAddress && (
          <div className="user-info">
            <div className="user-avatar">👤</div>
            <span className="user-address">{userAddress.slice(0, 6)}...{userAddress.slice(-4)}</span>
          </div>
        )}
      </div>
    </header>
  );
}
