import { ThemeProvider } from "next-themes";
import { AuthProvider } from "./context/AuthProvider";
import GlobalRoutes from "./routes/GlobalRoutes";

function App() {
  return (
    <AuthProvider>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange={false}>
        <GlobalRoutes />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
