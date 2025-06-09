import { Outlet } from "react-router";

export default function MainLayout() {
    return (
        <>
            <main className="p-2">
                <Outlet />
            </main>
            <footer className="bg-background-alt w-full h-32 flex items-center justify-center text-sm mt-8 text-gray-400">
                <div>
                    <p>Made by Filip Kohout</p>
                    <a className="no-underline text-gray-400" target="_blank" href="https://github.com/bakalari-api/bakalari-api-v3/blob/master/schools_list.md">Uses Bakalari API V3</a>
                </div>
            </footer>
        </>
    )
}