import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Loader from "./Loader";

type ToastData = {
    message: string;
};

function RootLayout() {
    const [toast, setToast] = useState<ToastData | null>(null);

    useEffect(() => {
        const message = sessionStorage.getItem("cms-toast");

        if (!message) {
            return;
        }

        sessionStorage.removeItem("cms-toast");

        const showTimer = window.setTimeout(() => {
            setToast({
                message,
            });
        }, 50);

        const hideTimer = window.setTimeout(() => {
            setToast(null);
        }, 3450);

        return () => {
            window.clearTimeout(showTimer);
            window.clearTimeout(hideTimer);
        };
    }, []);

    return (
        <div className="min-h-screen bg-base-200 text-base-content">
            <Header />

            <Loader />

            <Outlet />

            {toast && (
                <div
                    className="fixed left-1/2 top-4 z-[110] flex w-[calc(100%-2rem)] max-w-md -translate-x-1/2 items-center gap-3 rounded-2xl border border-base-300 bg-base-100/95 px-4 py-3 shadow-2xl backdrop-blur-md cms-toast"
                    role="status"
                    aria-live="polite"
                >
                    <span
                        className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-success/10 text-success"
                        aria-hidden="true"
                    >
                        <svg
                            viewBox="0 0 52 52"
                            className="h-7 w-7"
                            fill="none"
                        >
                            <circle
                                cx="26"
                                cy="26"
                                r="23"
                                className="toast-circle"
                            />

                            <path
                                d="M15 27l7 7 15-17"
                                className="toast-check"
                            />
                        </svg>
                    </span>

                    <p className="min-w-0 flex-1 text-sm font-medium leading-snug text-base-content">
                        {toast.message}
                    </p>

                    <button
                        type="button"
                        onClick={() => setToast(null)}
                        className="btn btn-ghost btn-xs btn-circle text-base-content/40 hover:text-base-content"
                        aria-label="Dismiss notification"
                    >
                        ✕
                    </button>
                </div>
            )}

            <style>{`
                @keyframes cms-toast-in {
                    0% {
                        opacity: 0;
                        transform: translate(-50%, -14px) scale(0.96);
                    }

                    60% {
                        opacity: 1;
                        transform: translate(-50%, 2px) scale(1.01);
                    }

                    100% {
                        opacity: 1;
                        transform: translate(-50%, 0) scale(1);
                    }
                }

                .cms-toast {
                    animation: cms-toast-in 0.35s cubic-bezier(0.16, 1, 0.3, 1) both;
                }

                .toast-circle {
                    stroke: currentColor;
                    stroke-width: 3;
                    stroke-linecap: round;
                    fill: none;
                    stroke-dasharray: 145;
                    stroke-dashoffset: 145;
                    animation: toast-circle-draw 0.45s ease-out forwards;
                }

                .toast-check {
                    stroke: currentColor;
                    stroke-width: 4;
                    stroke-linecap: round;
                    stroke-linejoin: round;
                    stroke-dasharray: 30;
                    stroke-dashoffset: 30;
                    animation: toast-check-draw 0.35s ease-out 0.35s forwards;
                }

                @keyframes toast-circle-draw {
                    to {
                        stroke-dashoffset: 0;
                    }
                }

                @keyframes toast-check-draw {
                    to {
                        stroke-dashoffset: 0;
                    }
                }

                @media (prefers-reduced-motion: reduce) {
                    .cms-toast,
                    .toast-circle,
                    .toast-check {
                        animation: none;
                    }

                    .toast-circle,
                    .toast-check {
                        stroke-dashoffset: 0;
                    }
                }
            `}</style>
        </div>
    );
}

export default RootLayout;