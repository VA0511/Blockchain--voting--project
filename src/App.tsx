import { useState } from 'react'
import './styles/theme.css'
import './App.css'
import { MainLayout } from './components/MainLayout'
import { Dashboard } from './pages/Dashboard'
import { Voters } from './pages/Voters'
import { Proposals } from './pages/Proposals'
import { MyVotes } from './pages/MyVotes'
import { Delegates } from './pages/Delegates'
import { Admin } from './pages/Admin'

function App() {
  return (
    <div>
      <h1>Voting DApp</h1>
      <p>The application is loading. If you see this, the basic setup is working.</p>
      <p>To find the error, uncomment the imports and the original return statement in <code>App.tsx</code> one by one.</p>
    </div>
  )
}

export default App
