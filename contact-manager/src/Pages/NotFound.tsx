import { Link } from "react-router-dom";

function NotFound() {
    return (
        <main className="relative flex min-h-[calc(100vh-64px)] h-screen w-screen items-center justify-center overflow-hidden bg-base-200 px-6 py-24">
            <div
                className="pointer-events-none absolute -top-24 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
                aria-hidden="true"
            />

            <div className="relative text-center">
                <p className="text-sm font-bold uppercase tracking-[0.3em] text-primary">
                    404
                </p>

                <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-6xl">
                    Page not found
                </h1>

                <p className="mx-auto mt-5 max-w-md text-base leading-7 text-base-content/60 sm:text-lg">
                    Sorry, we couldn&rsquo;t find the page you&rsquo;re
                    looking for. It may have been moved or no longer exists.
                </p>

                <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <Link
                        to="/"
                        className="btn btn-primary btn-lg shadow-lg shadow-primary/20"
                    >
                        Go back home
                    </Link>

                    <Link
                        to="/contacts"
                        className="btn btn-ghost btn-lg"
                    >
                        View contacts
                    </Link>
                </div>
            </div>
        </main>
    );
}

export default NotFound;