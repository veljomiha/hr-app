import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthProvider } from './components/UserContext';
import { BrowserRouter as Router } from 'react-router-dom';
import { TeamContextProvider } from './components/Profile/Team/TeamContextProvider';
import { PendingForApprovalContextProvider } from './components/Profile/PendingForApproval/PendingForApprovalContextProvider';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <PendingForApprovalContextProvider>
      <TeamContextProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </TeamContextProvider>
      </PendingForApprovalContextProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
