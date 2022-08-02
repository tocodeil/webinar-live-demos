import './App.css'
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import { useState } from 'react';


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
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const [accessToken, setAccessToken] = useState('');

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  async function getAccessToken() {
    const myaccessToken = await getAccessTokenSilently();
    setAccessToken(myaccessToken);
  }

  return (
    isAuthenticated && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <p>

          <button onClick={getAccessToken}>Show Access Token</button>
          <p>{accessToken}</p>
        </p>
      </div>
    )
  );
};


function App() {
  return (
    <Auth0Provider
      domain="my-demo-1.us.auth0.com"
      clientId="VYaCtlIb7lgfQ4yISynXhXHy72FZuriV"
      redirectUri={window.location.origin}
      audience="http://webinar-demo.tocode.co.il/todos"
    >
      <p>Hello World</p>
      <Profile />
      <LoginButton />
      <LogoutButton />
    </Auth0Provider>
  )
}

export default App
