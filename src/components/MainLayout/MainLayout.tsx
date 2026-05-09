import { ReactNode } from 'react';
import './MainLayout.css';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

interface MainLayoutProps {
  children: ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
  headerTitle: string;
  headerSubtitle?: string;
  userAddress?: string;
  userRole?: string;
}

export function MainLayout({
  children,
  currentPage,
  onNavigate,
  headerTitle,
  headerSubtitle,
  userAddress,
  userRole,
}: MainLayoutProps) {
  return (
    <div className="app-layout">
      <Sidebar 
        currentPage={currentPage} 
        onNavigate={onNavigate}
        userAddress={userAddress}
        userRole={userRole}
      />
      <div className="main-content">
        <Header 
          title={headerTitle}
          subtitle={headerSubtitle}
          userAddress={userAddress}
        />
        <div className="content-wrapper">
          {children}
        </div>
      </div>
    </div>
  );
}
