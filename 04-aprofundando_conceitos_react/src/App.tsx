import { ThemeProvider } from "@/components/theme/theme-provider";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { RouterProvider } from "react-router-dom";
import { Toaster } from 'sonner';
import { router } from "./routes";

export function App() {
  return(
    <ThemeProvider defaultTheme="dark" storageKey="pizzashop-theme" >
      <HelmetProvider>
        <Helmet titleTemplate="%s | pizza.shop"/>
        <Toaster richColors />
        <RouterProvider router={router} />
      </HelmetProvider>
    </ThemeProvider>
    
)
}




