import { ThemeProvider as NextThemeProvider } from "next-themes";
import GlobalRoutes from "./routes/GlobalRoutes";
import AuthStore from "./context/GlobalStore";
import { Provider } from "react-redux";
function App() {
  return (
    <Provider store={AuthStore}>
      <NextThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange={false}>
        <GlobalRoutes />
      </NextThemeProvider>
    </Provider>
  );
}

export default App;
