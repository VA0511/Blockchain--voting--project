import { useState } from 'react'
import './styles/theme.css'
import './App.css'
import { MainLayout } from './components/MainLayout/MainLayout'
import { Dashboard } from './pages/Dashboard/Dashboard'
import { Voters } from './pages/Voters/Voters'
import { Proposals } from './pages/Proposals/Proposals'
import { MyVotes } from './pages/MyVotes/MyVotes'
import { Delegates } from './pages/Delegates/Delegates'
import { Admin } from './pages/Admin/Admin'
import { Login } from './pages/Login/Login'

function App() {
  const [currentPage, setCurrentPage] = useState('Dashboard')
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const renderPage = () => {
    switch (currentPage) {
      case 'Dashboard':
        return <Dashboard />
      case 'Voters':
        return <Voters />
      case 'Proposals':
        return <Proposals />
      case 'My Votes':
        return <MyVotes />
      case 'Delegates':
        return <Delegates />
      case 'Admin':
        return <Admin />
      default:
        return <Dashboard />
    }
  }

  const handleLogin = () => setIsAuthenticated(true)
  const handleLogout = () => setIsAuthenticated(false)

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />
  }

  return (
    <MainLayout
      currentPage={currentPage}
      onNavigate={setCurrentPage}
      headerTitle={currentPage}
      onLogout={handleLogout}
    >
      {renderPage()}
    </MainLayout>
  )
}

export default App
