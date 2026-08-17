import { useRef } from "react";
import {
    Form,
    Link,
    useLoaderData,
    type Params,
} from "react-router-dom";
import { getContactById } from "../contacts-api/contacts-api";

type ContactIdArgs = {
    params: Params<string>;
};

export const contactLoaderById = async ({
    params,
}: ContactIdArgs) => {
    const { contactId } = params;

    const contact = await getContactById(contactId!);

    return {
        contact,
    };
};

function ContactDetails() {
    const { contact } =
        useLoaderData() as Awaited<
            ReturnType<typeof contactLoaderById>
        >;

    const deleteDialogRef = useRef<HTMLDialogElement>(null);

    const initials =
        `${contact?.name.first?.[0] ?? ""}${contact?.name.last?.[0] ?? ""}`.toUpperCase();

    return (
        <main className="relative min-h-[calc(100vh-64px)] overflow-hidden bg-base-200 px-4 py-8 sm:px-6 sm:py-10">
            <div
                className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-primary/5 blur-3xl"
                aria-hidden="true"
            />

            <div className="relative mx-auto max-w-2xl animate-page-in">
                <div className="mb-6">
                    <Link
                        to="/contacts"
                        className="btn btn-ghost btn-sm gap-2"
                    >
                        <span aria-hidden="true">←</span>
                        Back to Contacts
                    </Link>
                </div>

                <div className="card overflow-hidden border border-base-300 bg-base-100 shadow-xl">
                    <div className="h-24 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent" />

                    <div className="card-body -mt-16 items-center text-center">
                        <div className="avatar mb-4">
                            <div className="w-32 rounded-full bg-base-100 p-1 shadow-xl ring-2 ring-primary/30">
                                {contact?.picture?.thumbnail ? (
                                    <img
                                        src={contact.picture.thumbnail}
                                        alt={`${contact.name.first} ${contact.name.last}`}
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center rounded-full bg-primary/10 text-3xl font-bold text-primary">
                                        {initials}
                                    </div>
                                )}
                            </div>
                        </div>

                        <h1 className="text-3xl font-bold tracking-tight">
                            {contact?.name.first} {contact?.name.last}
                        </h1>

                        <p className="mt-1 break-all text-base-content/60">
                            {contact?.email}
                        </p>

                        <div className="my-5 w-full divider" />

                        <div className="grid w-full gap-3 sm:grid-cols-2">
                            <Link
                                to={`/contacts/${contact?.login.uuid}/update`}
                                className="btn btn-primary btn-outline"
                            >
                                Edit Contact
                            </Link>

                            <button
                                type="button"
                                className="btn btn-error"
                                onClick={() =>
                                    deleteDialogRef.current?.showModal()
                                }
                            >
                                Delete Contact
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <dialog
                ref={deleteDialogRef}
                className="modal"
            >
                <div className="modal-box w-[calc(100%-2rem)] max-w-md rounded-3xl border border-base-300">
                    <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-error/10 text-error">
                            <span className="text-xl">!</span>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold">
                                Delete contact?
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-base-content/60">
                                Are you sure you want to delete this contact?
                                This action cannot be undone.
                            </p>
                        </div>
                    </div>

                    <div className="modal-action">
                        <button
                            type="button"
                            className="btn btn-ghost"
                            onClick={() =>
                                deleteDialogRef.current?.close()
                            }
                        >
                            Cancel
                        </button>

                        <Form
                            method="POST"
                            action={`/contacts/${contact?.login.uuid}/destroy`}
                            onSubmit={() =>
                                sessionStorage.setItem(
                                    "cms-toast",
                                    "Contact deleted successfully"
                                )
                            }
                        >
                            <button
                                type="submit"
                                className="btn btn-error"
                            >
                                Delete
                            </button>
                        </Form>
                    </div>
                </div>

                <form
                    method="dialog"
                    className="modal-backdrop"
                >
                    <button>close</button>
                </form>
            </dialog>

            <style>{`
                @keyframes details-page-in {
                    from {
                        opacity: 0;
                        transform: translateY(8px);
                    }

                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-page-in {
                    animation: details-page-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) both;
                }

                @media (prefers-reduced-motion: reduce) {
                    .animate-page-in {
                        animation: none;
                    }
                }
            `}</style>
        </main>
    );
}

export default ContactDetails;