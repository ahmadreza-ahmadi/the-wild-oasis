import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider } from 'react-router';
import { ThemeProvider } from '@/contexts/ThemeContext.tsx';
import router from '../router/index.ts';
import GlobalStyles from '../styles/GlobalStyles.ts';
import AppToaster from '../ui/AppToaster.tsx';
import MobileNotSupportedScreen from '../ui/MobileNotSupportedScreen.tsx';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  if (WURFL.is_mobile) {
    return (
      <>
        <GlobalStyles />
        <MobileNotSupportedScreen>
          We don't support mobile screens yet. Please enter with a desktop
          device.
        </MobileNotSupportedScreen>
      </>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />

      <AppToaster />
      <GlobalStyles />
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
