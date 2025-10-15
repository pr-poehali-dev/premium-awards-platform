
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import OldHome2 from "./pages/OldHome2";
import Premium from "./pages/Premium";
import CatalogPage from "./pages/CatalogPage";
import PortfolioPage from "./pages/PortfolioPage";
import ConstructorPage from "./pages/ConstructorPage";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import NotFound from "./pages/NotFound";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/old" element={<OldHome2 />} />
          <Route path="/premium" element={<><Header /><Premium /><Footer /></>} />
          <Route path="/catalog" element={<><Header /><CatalogPage /><Footer /></>} />
          <Route path="/portfolio" element={<><Header /><PortfolioPage /><Footer /></>} />
          <Route path="/constructor" element={<><Header /><ConstructorPage /><Footer /></>} />
          <Route path="/contact" element={<><Header /><ContactPage /><Footer /></>} />
          <Route path="/about" element={<><Header /><AboutPage /><Footer /></>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<><Header /><NotFound /><Footer /></>} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;