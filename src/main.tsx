import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css"
import "./water.css"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router";
import TimetablePage from "./routes/TimetablePage.tsx";
import HomePage from "./routes/HomePage.tsx";
import MainLayout from "./routes/MainLayout.tsx";
import InitPage from "./routes/InitPage.tsx";
import { FiltersProvider } from "./providers/FiltersProvider.tsx";
import { GroupsProvider } from "./providers/GroupsProvider.tsx";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            refetchOnMount: false,
            retry: 3,
        },
    },
});

const router = createBrowserRouter([
    {
        path: "/",
        Component: MainLayout,
        children: [
            { index: true, Component: HomePage },
            {
                path: "timetable/:municipality/:schoolId/:classId",
                Component: () =>
                    <FiltersProvider>
                        <GroupsProvider>
                            <TimetablePage />
                        </GroupsProvider>
                    </FiltersProvider>
            },
            {
                path: "init",
                Component: InitPage,
            },
        ],
    },
]);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router}/>
        </QueryClientProvider>
    </StrictMode>,
);
