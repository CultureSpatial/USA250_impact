// pages/_app.tsx
import '../styles/globals.css';

// Importing design tokens for consistency
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  // Define your design tokens here
  ${props => props.theme}
`;

function MyApp({ Component, pageProps }) {
  return (
    <>  
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;