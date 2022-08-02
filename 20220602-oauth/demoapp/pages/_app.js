import '../styles/globals.css'
import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";


function MyApp({ Component, pageProps }) {
  const redirectUri = typeof window !== 'undefined' ? window.location.href : '/';

  return (
    <Auth0Provider
      domain="webinar-demo.us.auth0.com"
      clientId="NupbWrRjHcf1PLaVxeqYPcYCC4O6F02m"
      audience="https://tocode-webinars/todos"
      scope="manage:todos"
      useRefreshTokens={ true }
      cacheLocation="localstorage"
      redirectUri={redirectUri}
    >
      <Component {...pageProps} />
    </Auth0Provider>
  )
}

export default MyApp
