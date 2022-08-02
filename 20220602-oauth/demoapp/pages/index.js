import { useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <button onClick={() => loginWithRedirect()}>Log In</button>;
};

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button onClick={() => logout({ returnTo: window.location.origin })}>
      Log Out
    </button>
  );
};


const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    )
  );
};

export default function Home() {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [serverInfo, setServerInfo] = useState({});

  async function getServerInfo() {
    const accessToken = await getAccessTokenSilently();
    const res = await fetch('/api/hello', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const serverInfo = await res.json();
    setServerInfo(serverInfo);
  }

  return (
    <div>
      <h1>My Auth0 Client</h1>
      <Profile />
      <div>
        {isAuthenticated ? <LogoutButton /> : <LoginButton />}
        {isAuthenticated && <button onClick={getServerInfo}>Get Server Info</button>}
        <div>
          {JSON.stringify(serverInfo)}
        </div>
      </div>
    </div>
  )
}
