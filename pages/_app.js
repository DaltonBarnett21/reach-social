import "../styles/globals.css";
import { AuthContextProvider } from "../context/authContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SocketContextProvider } from "../context/socketContext";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <SocketContextProvider>
          <Component {...pageProps} />
        </SocketContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
