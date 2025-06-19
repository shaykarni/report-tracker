import React, { useState, useEffect } from 'react';
import Login from './Login';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const cachedUser = localStorage.getItem('user');
    if (cachedUser) {
      setUser(JSON.parse(cachedUser));
    }
  }, []);

  const handleLogin = (firebaseUser) => {
    localStorage.setItem('user', JSON.stringify(firebaseUser));
    setUser(firebaseUser);
  };

  if (!user) return <Login onLogin={handleLogin} />;

  return (
    <div className="p-4 text-center">
      <h1 className="text-xl">Welcome, you're logged in 🎉</h1>
      {/* We'll build the main dashboard next */}
    </div>
  );
}

export default App;
