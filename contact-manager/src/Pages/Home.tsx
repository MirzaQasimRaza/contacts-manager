import { Link } from "react-router-dom";

function Home() {
    return (
        <main className="relative min-h-[calc(100vh-64px)] overflow-hidden bg-base-200">
            {/* Ambient background accents */}
            <div
                className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-primary/10 blur-3xl"
                aria-hidden="true"
            />

            <div
                className="pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-primary/5 blur-3xl"
                aria-hidden="true"
            />

            <div className="relative mx-auto flex min-h-[calc(100vh-64px)] max-w-7xl items-center px-6 py-16">
                <div className="grid w-full items-center gap-14 lg:grid-cols-2">

                    {/* LEFT CONTENT */}
                    <div className="animate-home-content max-w-2xl text-center lg:text-left">

                        <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                            Manage your contacts
                            <span className="text-primary">
                                {" "}effortlessly.
                            </span>
                        </h1>

                        <p className="mx-auto max-w-xl py-6 text-base leading-7 text-base-content/60 sm:text-lg lg:mx-0">
                            Add, edit, duplicate, view and remove your contacts
                            from one simple dashboard — built to feel fast,
                            tidy, and dependable.
                        </p>

                        {/* BUTTONS */}
                        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
                            <Link
                                to="/contacts"
                                className="btn btn-primary btn-lg w-full shadow-lg shadow-primary/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl sm:w-auto"
                            >
                                View Contacts
                            </Link>

                            <Link
                                to="/about/info"
                                className="btn btn-ghost btn-lg w-full sm:w-auto"
                            >
                                Learn more
                            </Link>
                        </div>

                        {/* FEATURES */}
                        <div className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-base-content/50 lg:justify-start">
                            <span className="flex items-center gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-success" />
                                Create &amp; edit instantly
                            </span>

                            <span className="flex items-center gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-success" />
                                One-click duplicate
                            </span>

                            <span className="flex items-center gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-success" />
                                Safe, confirmed deletes
                            </span>
                        </div>
                    </div>

                    {/* RIGHT CONTACT CARD VISUAL */}
                    <div
                        className="relative mx-auto h-72 w-72 sm:h-80 sm:w-80 lg:h-[390px] lg:w-[390px]"
                        aria-hidden="true"
                    >
                        {/* BACK CARD */}
                        <div
                            className="
                                hero-card
                                hero-card-back
                                absolute
                                inset-0
                                rounded-[2rem]
                                border
                                border-base-300
                                bg-base-100
                                shadow-xl
                            "
                        />

                        {/* MIDDLE CARD */}
                        <div
                            className="
                                hero-card
                                hero-card-mid
                                absolute
                                inset-0
                                rounded-[2rem]
                                border
                                border-base-300
                                bg-base-100
                                shadow-xl
                            "
                        />

                        {/* FRONT CARD */}
                        <div
                            className="
                                hero-card
                                hero-card-front
                                absolute
                                inset-0
                                flex
                                flex-col
                                justify-between
                                rounded-[2rem]
                                border
                                border-base-300
                                bg-base-100
                                p-6
                                shadow-2xl
                            "
                        >

                            {/* CONTACT HEADER */}
                            <div className="flex items-center gap-3">

                                {/* AVATAR */}
                                <div className="avatar">
                                    <div
                                        className="
                                            h-14
                                            w-14
                                            overflow-hidden
                                            rounded-full
                                            ring-2
                                            ring-primary/20
                                            ring-offset-2
                                            ring-offset-base-100
                                        "
                                    >
                                        <img
                                            src="https://i.pravatar.cc/150?img=47"
                                            alt="Jamie Rivera"
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                </div>

                                {/* NAME + EMAIL */}
                                <div className="min-w-0">
                                    <p className="truncate font-semibold text-base-content">
                                        Jamie Rivera
                                    </p>

                                    <p className="truncate text-xs text-base-content/50">
                                        jamie@example.com
                                    </p>
                                </div>
                            </div>

                            {/* CONTACT DETAILS / ACTIONS */}
                            <div>

                                {/* SKELETON DETAILS */}
                                <div className="mb-5">
                                    <div className="h-2 w-2/3 rounded-full bg-base-300" />

                                    <div className="mt-3 h-2 w-1/2 rounded-full bg-base-200" />
                                </div>

                                {/* ACTION BADGES */}
                                <div className="flex flex-wrap gap-2">
                                    <span className="badge badge-sm">
                                        Edit
                                    </span>

                                    <span className="badge badge-sm">
                                        Duplicate
                                    </span>

                                    <span className="badge badge-sm badge-outline">
                                        Delete
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ANIMATIONS */}
            <style>{`
                .animate-home-content {
                    animation:
                        home-content-in
                        0.6s
                        cubic-bezier(0.16, 1, 0.3, 1)
                        both;
                }

                .hero-card {
                    transition:
                        transform
                        0.4s
                        cubic-bezier(0.16, 1, 0.3, 1);
                }

                .hero-card-back {
                    transform:
                        rotate(-9deg)
                        translateY(7px);
                    opacity: 0.5;
                }

                .hero-card-mid {
                    transform:
                        rotate(6deg)
                        translateY(3px);
                    opacity: 0.75;
                }

                .hero-card-front {
                    animation:
                        hero-card-in
                        0.7s
                        cubic-bezier(0.16, 1, 0.3, 1)
                        both;
                }

                @keyframes home-content-in {
                    from {
                        opacity: 0;
                        transform: translateY(14px);
                    }

                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes hero-card-in {
                    from {
                        opacity: 0;
                        transform:
                            translateY(18px)
                            scale(0.96);
                    }

                    to {
                        opacity: 1;
                        transform:
                            translateY(0)
                            scale(1);
                    }
                }

                @media (prefers-reduced-motion: reduce) {
                    .animate-home-content,
                    .hero-card-front {
                        animation: none;
                    }
                }
            `}</style>
        </main>
    );
}

export default Home;