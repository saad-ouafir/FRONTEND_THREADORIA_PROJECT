import { ThemeProvider } from "next-themes";
import GlobalRoutes from "./routes/GlobalRoutes";

function App() {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={true}
      disableTransitionOnChange={false}
    >
      <GlobalRoutes />
    </ThemeProvider>
  );
}

export default App;
