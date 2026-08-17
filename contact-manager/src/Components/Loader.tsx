import { useEffect, useState } from "react";
import { useNavigation } from "react-router-dom";

function Loader() {
    const navigation = useNavigation();
    const isLoading = navigation.state === "loading";
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        let showTimer: number | undefined;
        let hideTimer: number | undefined;

        if (isLoading) {
            showTimer = window.setTimeout(() => {
                setVisible(true);
            }, 100);
        } else {
            hideTimer = window.setTimeout(() => {
                setVisible(false);
            }, 150);
        }

        return () => {
            window.clearTimeout(showTimer);
            window.clearTimeout(hideTimer);
        };
    }, [isLoading]);

    return (
        <>
            <div
                className={[
                    "fixed top-0 left-0 right-0 z-[100] h-[3px] origin-left bg-primary",
                    "transition-opacity duration-200",
                    isLoading ? "opacity-100 loader-progress" : "opacity-0",
                ].join(" ")}
                aria-hidden="true"
            />

            {visible && (
                <div
                    className="fixed inset-0 z-[95] flex items-center justify-center bg-base-100/60 px-6 backdrop-blur-sm loader-overlay"
                    role="status"
                    aria-live="polite"
                    aria-label="Loading page"
                >
                    <div className="flex flex-col items-center gap-4">
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-base-300 bg-base-100 shadow-xl">
                            <span className="loading loading-spinner loading-lg text-primary" />
                        </div>

                        <div className="text-center">
                            <p className="text-sm font-semibold text-base-content">
                                Loading
                            </p>

                            <p className="mt-1 text-xs text-base-content/50">
                                Preparing your page...
                            </p>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                @keyframes loader-progress {
                    0% {
                        transform: scaleX(0.05);
                    }

                    50% {
                        transform: scaleX(0.6);
                    }

                    100% {
                        transform: scaleX(0.95);
                    }
                }

                .loader-progress {
                    animation: loader-progress 1.1s ease-in-out infinite;
                }

                @keyframes loader-overlay {
                    from {
                        opacity: 0;
                    }

                    to {
                        opacity: 1;
                    }
                }

                .loader-overlay {
                    animation: loader-overlay 0.2s ease-out both;
                }

                @media (prefers-reduced-motion: reduce) {
                    .loader-progress,
                    .loader-overlay {
                        animation: none;
                    }
                }
            `}</style>
        </>
    );
}

export default Loader;