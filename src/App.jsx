import { ThemeProvider as NextThemeProvider } from "next-themes";
import GlobalRoutes from "./routes/GlobalRoutes";
import AuthStore from "./context/GlobalStore";
import { Provider } from "react-redux";
import { FollowSyncProvider } from "./hooks/api/useFollowSync.jsx";

// -------------- Global State Providers ------------------
// <Provider>           : for AuthenticationRedux store
// <NextThemeProvider>  : for next-themes (light/dark)
// <FollowSyncProvider> : for follow status synchronization
// --------------------------------------------------------

function App() {
  return (
    <Provider store={AuthStore}>
      <NextThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange={false}>
        <FollowSyncProvider>
          <GlobalRoutes />
        </FollowSyncProvider>
      </NextThemeProvider>
    </Provider>
  );
}

export default App;
