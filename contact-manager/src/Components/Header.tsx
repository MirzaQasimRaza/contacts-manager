import { NavLink } from "react-router-dom";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    [
        "rounded-xl px-3.5 py-2 text-sm font-medium transition-all duration-200",
        isActive
            ? "bg-primary/10 text-primary shadow-sm"
            : "text-base-content/65 hover:bg-base-200 hover:text-base-content",
    ].join(" ");

const mobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    [
        "block rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
        isActive
            ? "bg-primary/10 text-primary"
            : "text-base-content/70 hover:bg-base-200 hover:text-base-content",
    ].join(" ");

function Header() {
    return (
        <header className="sticky top-0 z-50 border-b border-base-300 bg-base-100/90 px-4 shadow-sm backdrop-blur-md sm:px-6">
            <div className="navbar mx-auto min-h-16 max-w-7xl px-0">

                {/* LEFT — LOGO + MOBILE MENU */}
                <div className="navbar-start">
                    <div className="dropdown">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost btn-circle lg:hidden"
                            aria-label="Open navigation menu"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />
                            </svg>
                        </div>

                        <ul className="menu menu-sm dropdown-content z-[60] mt-3 w-60 gap-1 rounded-2xl border border-base-300 bg-base-100 p-2 shadow-2xl">

                            <li>
                                <NavLink
                                    to="/"
                                    end
                                    className={mobileNavLinkClass}
                                >
                                    Home
                                </NavLink>
                            </li>

                            <li>
                                <NavLink
                                    to="/contacts"
                                    className={mobileNavLinkClass}
                                >
                                    Contacts
                                </NavLink>
                            </li>

                            <li className="menu-title px-3 pb-1 pt-3 text-[11px] uppercase tracking-[0.2em] text-base-content/40">
                                About
                            </li>

                            <li>
                                <NavLink
                                    to="/about/info"
                                    className={mobileNavLinkClass}
                                >
                                    Info
                                </NavLink>
                            </li>

                            <li>
                                <NavLink
                                    to="/about/settings"
                                    className={mobileNavLinkClass}
                                >
                                    Settings
                                </NavLink>
                            </li>

                        </ul>
                    </div>

                    {/* LOGO */}
                    <NavLink
                        to="/"
                        className="btn btn-ghost gap-2 px-2 text-xl font-bold tracking-tight normal-case hover:bg-transparent"
                    >
                        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-sm font-black text-primary-content shadow-md shadow-primary/20">
                            C
                        </span>

                        <span>CMS</span>
                    </NavLink>
                </div>

                {/* CENTER — DESKTOP NAVIGATION */}
                <div className="navbar-center hidden lg:flex">
                    <nav>
                        <ul className="menu menu-horizontal gap-1 px-1">

                            <li>
                                <NavLink
                                    to="/"
                                    end
                                    className={navLinkClass}
                                >
                                    Home
                                </NavLink>
                            </li>

                            <li>
                                <NavLink
                                    to="/contacts"
                                    className={navLinkClass}
                                >
                                    Contacts
                                </NavLink>
                            </li>

                            <li>
                                <details>
                                    <summary className="rounded-xl px-3.5 py-2 text-sm font-medium text-base-content/65 transition-all duration-200 hover:bg-base-200 hover:text-base-content">
                                        About
                                    </summary>

                                    <ul className="z-[60] mt-2 w-44 rounded-2xl border border-base-300 bg-base-100 p-2 shadow-2xl">

                                        <li>
                                            <NavLink
                                                to="/about/info"
                                                className={mobileNavLinkClass}
                                            >
                                                Info
                                            </NavLink>
                                        </li>

                                        <li>
                                            <NavLink
                                                to="/about/settings"
                                                className={mobileNavLinkClass}
                                            >
                                                Settings
                                            </NavLink>
                                        </li>

                                    </ul>
                                </details>
                            </li>

                        </ul>
                    </nav>
                </div>

                {/* RIGHT — INTENTIONALLY EMPTY */}
                <div className="navbar-end" />

            </div>
        </header>
    );
}

export default Header;