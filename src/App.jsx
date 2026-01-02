import { ThemeProvider } from "next-themes";
import GlobalRoutes from "./routes/GlobalRoutes";

// React Auth Kit
// import { AuthProvider } from "react-auth-kit";
// import authStore from "./features/authStore";

function App() {
  return (
    // <AuthProvider store={authStore}>
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={true}
      disableTransitionOnChange={false}>
      <GlobalRoutes />
    </ThemeProvider>
    // </AuthProvider>
  );
}

export default App;
