import { ThemeProvider } from "next-themes";
import GlobalRoutes from "./routes/GlobalRoutes";
import AuthStore from "./context/GlobalStore";
import { Provider } from "react-redux";
function App() {
  return (
    <Provider store={AuthStore}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange={false}>
        <GlobalRoutes />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
