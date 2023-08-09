import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/auth";
import { HttpProvider } from "./context/http";
import { mainRouteList } from "./routes/routes";
import { AppConfigProvider } from "./context/config";
import { ThemeProvider } from "./context/theme";
import { NotificationProvider } from "./context/notification";
import { LoadingProvider } from "./context/loading";
import 'antd/dist/reset.css';
import { Suspense } from "react";
import { ModalProvider } from "./context/modal";

function App() {
  return (
    <Suspense fallback="Loading...">
      <AppConfigProvider>
        <ThemeProvider>
          <LoadingProvider>
            <NotificationProvider>
              <ModalProvider>
                <AuthProvider>
                  <HttpProvider>
                    <RouterProvider router={createBrowserRouter(mainRouteList)} />
                  </HttpProvider>
                </AuthProvider>
              </ModalProvider>
            </NotificationProvider>
          </LoadingProvider>
        </ThemeProvider>
      </AppConfigProvider>
    </Suspense>
  )
}
export default App;
