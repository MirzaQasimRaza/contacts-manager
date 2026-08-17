import {
    Form,
    Link,
    useLoaderData,
    useNavigation,
    type ActionFunction,
} from "react-router-dom";
import { createContact, getContacts } from "../contacts-api/contacts-api";
import { useRef } from "react";

export const contactsLoader = async () => {
    const contacts = await getContacts();

    return {
        contacts,
    };
};

export const createContactAction: ActionFunction = async ({ request }) => {
    const formData = await request.formData();

    const first = formData.get("first")?.toString();
    const last = formData.get("last")?.toString();
    const email = formData.get("email")?.toString();

    if (!first || !last || !email) {
        throw new Error("Contact Details Not Provided.");
    }

    await createContact({
        name: {
            first,
            last,
        },
        email,
        login: {
            uuid: crypto.randomUUID(),
        },
        picture: {
            large: "",
            medium: "",
            thumbnail: "https://picsum.photos/200",
        },
    });

    sessionStorage.setItem(
        "cms-toast",
        "Contact created successfully"
    );

    return null;
};

function Contacts() {
    const { contacts } =
        useLoaderData() as Awaited<ReturnType<typeof contactsLoader>>;

    const navigation = useNavigation();

    const duplicateDialogRef = useRef<HTMLDialogElement>(null);
    const deleteDialogRef = useRef<HTMLDialogElement>(null);

    const duplicateFormRef = useRef<HTMLFormElement>(null);
    const deleteFormRef = useRef<HTMLFormElement>(null);

    const duplicateConfirmedRef = useRef(false);
    const deleteConfirmedRef = useRef(false);

    const openDuplicateDialog = (form: HTMLFormElement) => {
        duplicateFormRef.current = form;
        duplicateDialogRef.current?.showModal();
    };

    const confirmDuplicate = () => {
        const form = duplicateFormRef.current;

        if (!form) return;

        duplicateConfirmedRef.current = true;
        duplicateDialogRef.current?.close();

        form.requestSubmit();
    };

    const openDeleteDialog = (form: HTMLFormElement) => {
        deleteFormRef.current = form;
        deleteDialogRef.current?.showModal();
    };

    const confirmDelete = () => {
        const form = deleteFormRef.current;

        if (!form) return;

        deleteConfirmedRef.current = true;
        deleteDialogRef.current?.close();

        form.requestSubmit();
    };

    return (
        <main className="relative min-h-[calc(100vh-64px)] w-full max-w-full overflow-x-hidden bg-base-200 px-3 py-6 sm:px-6 sm:py-10">
            {/* Ambient background */}
            <div
                className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-primary/5 blur-3xl"
                aria-hidden="true"
            />

            <div className="relative mx-auto w-full min-w-0 max-w-7xl">
                {/* PAGE HEADER */}
                <div className="mb-6 min-w-0 animate-page-in sm:mb-8">
                    <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                        Contacts
                    </h1>

                    <p className="mt-2 max-w-2xl text-sm leading-6 text-base-content/60 sm:text-base">
                        Manage your contacts from one clean and organized
                        dashboard.
                    </p>
                </div>

                {/* MAIN GRID */}
                <div className="grid w-full min-w-0 gap-5 lg:grid-cols-3 lg:gap-6">
                    {/* ADD CONTACT */}
                    <section className="card min-w-0 w-full h-fit border border-base-300 bg-base-100 shadow-xl animate-card-in">
                        <div className="card-body min-w-0 px-4 py-5 sm:px-6 sm:py-6">
                            <div className="mb-4 min-w-0">
                                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
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
                                            d="M12 4v16m8-8H4"
                                        />
                                    </svg>
                                </div>

                                <h2 className="text-xl font-bold">
                                    Add Contact
                                </h2>

                                <p className="mt-1 text-sm text-base-content/60">
                                    Create a new contact.
                                </p>
                            </div>

                            <Form
                                method="POST"
                                className="flex min-w-0 flex-col gap-4"
                            >
                                <label className="floating-label block min-w-0">
                                    <span>First Name</span>

                                    <input
                                        name="first"
                                        type="text"
                                        placeholder="First Name"
                                        className="input input-bordered block w-full min-w-0 max-w-full transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                                        required
                                    />
                                </label>

                                <label className="floating-label block min-w-0">
                                    <span>Last Name</span>

                                    <input
                                        name="last"
                                        type="text"
                                        placeholder="Last Name"
                                        className="input input-bordered block w-full min-w-0 max-w-full transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                                        required
                                    />
                                </label>

                                <label className="floating-label block min-w-0">
                                    <span>Email Address</span>

                                    <input
                                        name="email"
                                        type="email"
                                        placeholder="Email Address"
                                        className="input input-bordered block w-full min-w-0 max-w-full transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                                        required
                                    />
                                </label>

                                <button
                                    type="submit"
                                    className="btn btn-primary mt-2 w-full max-w-full shadow-md shadow-primary/20 transition-all hover:-translate-y-0.5"
                                >
                                    {navigation.state === "submitting"
                                        ? "Creating..."
                                        : "Add Contact"}
                                </button>
                            </Form>
                        </div>
                    </section>

                    {/* CONTACT LIST */}
                    <section className="min-w-0 w-full lg:col-span-2">
                        <div className="card min-w-0 w-full border border-base-300 bg-base-100 shadow-xl animate-card-in">
                            <div className="card-body min-w-0 px-4 py-5 sm:px-6 sm:py-6">
                                <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                    <div className="min-w-0">
                                        <h2 className="text-xl font-bold sm:text-2xl">
                                            Your Contacts
                                        </h2>

                                        <p className="mt-1 text-sm text-base-content/60">
                                            Select a contact to view their
                                            details.
                                        </p>
                                    </div>

                                    <div className="badge badge-primary badge-outline shrink-0 self-start sm:self-auto">
                                        {contacts.length}{" "}
                                        {contacts.length === 1
                                            ? "Contact"
                                            : "Contacts"}
                                    </div>
                                </div>

                                <div className="divider my-3" />

                                {contacts.length === 0 ? (
                                    <div className="flex min-w-0 flex-col items-center justify-center rounded-2xl border border-dashed border-base-300 px-4 py-14 text-center sm:px-6">
                                        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-base-200 text-base-content/50">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-7 w-7"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="1.7"
                                                    d="M17 20h5v-2a4 4 0 00-4-4h-1m-4 6H3v-2a4 4 0 014-4h4a4 4 0 014 4v2zm-2-9a4 4 0 11-8 0 4 4 0 018 0zm7-2a3 3 0 10-2.83-4"
                                                />
                                            </svg>
                                        </div>

                                        <h3 className="text-lg font-bold">
                                            No contacts yet
                                        </h3>

                                        <p className="mt-1 max-w-sm text-sm text-base-content/60">
                                            Add your first contact using the
                                            form beside this list.
                                        </p>
                                    </div>
                                ) : (
                                    <div className="flex min-w-0 flex-col gap-3">
                                        {contacts.map((contact) => (
                                            <div
                                                key={contact.login.uuid}
                                                className="group min-w-0 w-full overflow-hidden rounded-2xl border border-base-300 p-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/20 hover:bg-base-200/60 hover:shadow-md sm:p-4"
                                            >
                                                <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                                    {/* CONTACT INFO */}
                                                    <Link
                                                        to={`/contacts/${contact.login.uuid}`}
                                                        className="flex min-w-0 max-w-full items-center gap-3 sm:gap-4"
                                                    >
                                                        <div className="avatar shrink-0">
                                                            <div className="w-12 rounded-full ring-2 ring-base-200 transition-all group-hover:ring-primary/20 sm:w-14">
                                                                <img
                                                                    src={
                                                                        contact
                                                                            .picture
                                                                            .thumbnail
                                                                    }
                                                                    alt={`${contact.name.first} ${contact.name.last}`}
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="min-w-0 max-w-full">
                                                            <h3 className="truncate font-bold text-base sm:text-lg">
                                                                {
                                                                    contact.name
                                                                        .first
                                                                }{" "}
                                                                {
                                                                    contact.name
                                                                        .last
                                                                }
                                                            </h3>

                                                            <p className="max-w-full truncate text-sm text-base-content/60">
                                                                {
                                                                    contact.email
                                                                }
                                                            </p>
                                                        </div>
                                                    </Link>

                                                    {/* ACTIONS */}
                                                    <div className="flex min-w-0 w-full flex-wrap gap-2 sm:w-auto sm:shrink-0 sm:justify-end">
                                                        {/* VIEW */}
                                                        <Link
                                                            to={`/contacts/${contact.login.uuid}`}
                                                            className="btn btn-sm btn-outline flex-1 sm:flex-none"
                                                        >
                                                            View
                                                        </Link>

                                                        {/* EDIT */}
                                                        <Link
                                                            to={`/contacts/${contact.login.uuid}/update`}
                                                            className="btn btn-sm btn-primary btn-outline flex-1 sm:flex-none"
                                                        >
                                                            Edit
                                                        </Link>

                                                        {/* DUPLICATE */}
                                                        <Form
                                                            method="POST"
                                                            className="flex-1 sm:flex-none"
                                                            onSubmit={(event) => {
                                                                if (
                                                                    duplicateConfirmedRef.current
                                                                ) {
                                                                    duplicateConfirmedRef.current =
                                                                        false;
                                                                    return;
                                                                }

                                                                event.preventDefault();

                                                                openDuplicateDialog(
                                                                    event.currentTarget
                                                                );
                                                            }}
                                                        >
                                                            <input
                                                                type="hidden"
                                                                name="first"
                                                                value={
                                                                    contact.name
                                                                        .first
                                                                }
                                                            />

                                                            <input
                                                                type="hidden"
                                                                name="last"
                                                                value={
                                                                    contact.name
                                                                        .last
                                                                }
                                                            />

                                                            <input
                                                                type="hidden"
                                                                name="email"
                                                                value={
                                                                    contact.email
                                                                }
                                                            />

                                                            <button
                                                                type="submit"
                                                                className="btn btn-sm btn-accent w-full"
                                                            >
                                                                Duplicate
                                                            </button>
                                                        </Form>

                                                        {/* DELETE */}
                                                        <Form
                                                            method="POST"
                                                            action={`/contacts/${contact.login.uuid}/destroy`}
                                                            className="flex-1 sm:flex-none"
                                                            onSubmit={(event) => {
                                                                if (
                                                                    deleteConfirmedRef.current
                                                                ) {
                                                                    deleteConfirmedRef.current =
                                                                        false;
                                                                    return;
                                                                }

                                                                event.preventDefault();

                                                                openDeleteDialog(
                                                                    event.currentTarget
                                                                );
                                                            }}
                                                        >
                                                            <button
                                                                type="submit"
                                                                className="btn btn-sm btn-error w-full"
                                                            >
                                                                Delete
                                                            </button>
                                                        </Form>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>
                </div>
            </div>

            {/* DUPLICATE CONFIRMATION MODAL */}
            <dialog
                ref={duplicateDialogRef}
                className="modal"
            >
                <div className="modal-box w-[calc(100%-1.5rem)] max-w-md rounded-3xl border border-base-300 sm:w-[calc(100%-2rem)]">
                    <div className="flex items-start gap-3 sm:gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <span className="text-xl">?</span>
                        </div>

                        <div className="min-w-0">
                            <h3 className="text-xl font-bold">
                                Duplicate contact?
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-base-content/60">
                                Are you sure you want to create a duplicate of
                                this contact?
                            </p>
                        </div>
                    </div>

                    <div className="modal-action flex-wrap">
                        <button
                            type="button"
                            className="btn btn-ghost"
                            onClick={() =>
                                duplicateDialogRef.current?.close()
                            }
                        >
                            Cancel
                        </button>

                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={confirmDuplicate}
                        >
                            Duplicate
                        </button>
                    </div>
                </div>

                <form
                    method="dialog"
                    className="modal-backdrop"
                >
                    <button>close</button>
                </form>
            </dialog>

            {/* DELETE CONFIRMATION MODAL */}
            <dialog
                ref={deleteDialogRef}
                className="modal"
            >
                <div className="modal-box w-[calc(100%-1.5rem)] max-w-md rounded-3xl border border-base-300 sm:w-[calc(100%-2rem)]">
                    <div className="flex items-start gap-3 sm:gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-error/10 text-error">
                            <span className="text-xl">!</span>
                        </div>

                        <div className="min-w-0">
                            <h3 className="text-xl font-bold">
                                Delete contact?
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-base-content/60">
                                Are you sure you want to delete this contact?
                                This action cannot be undone.
                            </p>
                        </div>
                    </div>

                    <div className="modal-action flex-wrap">
                        <button
                            type="button"
                            className="btn btn-ghost"
                            onClick={() =>
                                deleteDialogRef.current?.close()
                            }
                        >
                            Cancel
                        </button>

                        <button
                            type="button"
                            className="btn btn-error"
                            onClick={confirmDelete}
                        >
                            Delete
                        </button>
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
                @keyframes page-in {
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
                    animation: page-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) both;
                }

                .animate-card-in {
                    animation: page-in 0.45s cubic-bezier(0.16, 1, 0.3, 1) both;
                }

                @media (max-width: 374px) {
                    .animate-card-in {
                        animation-duration: 0.35s;
                    }
                }

                @media (prefers-reduced-motion: reduce) {
                    .animate-page-in,
                    .animate-card-in {
                        animation: none;
                    }
                }
            `}</style>
        </main>
    );
}

export default Contacts;