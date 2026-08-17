import {
    type ActionFunction,
    Form,
    type Params,
    redirect,
    useLoaderData,
} from "react-router-dom";

import {
    getContactById,
    updateContactById,
} from "../contacts-api/contacts-api";

type ContactUpdateArgs = {
    params: Params<string>;
};

export const contactUpdateLoader = async ({
    params,
}: ContactUpdateArgs) => {
    const { contactId } = params;

    const contact = await getContactById(contactId!);

    if (!contact) {
        throw new Error("Contact not found.");
    }

    return {
        contact,
    };
};

export const contactUpdateAction: ActionFunction = async ({
    request,
    params,
}) => {
    const formData = await request.formData();

    const first = formData.get("first")?.toString();
    const last = formData.get("last")?.toString();
    const email = formData.get("email")?.toString();

    const contactId = params.contactId;

    if (!contactId || !first || !last || !email) {
        throw new Error("Missing required fields");
    }

    await updateContactById(contactId, {
        name: {
            first,
            last,
        },
        email,
    });

    sessionStorage.setItem(
        "cms-toast",
        "Contact updated successfully"
    );

    return redirect(`/contacts/${contactId}`);
};

const ContactUpdatePage = () => {
    const { contact } =
        useLoaderData() as Awaited<
            ReturnType<typeof contactUpdateLoader>
        >;

    return (
        <main className="relative min-h-[calc(100vh-64px)] overflow-hidden bg-base-200 px-4 py-8 sm:px-6 sm:py-10">
            <div
                className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-primary/5 blur-3xl"
                aria-hidden="true"
            />

            <div className="relative mx-auto max-w-xl animate-update-page">
                <div className="mb-6">

                    <h1 className="text-3xl font-bold tracking-tight">
                        Update Contact
                    </h1>

                    <p className="mt-2 text-base-content/60">
                        Update the contact information below.
                    </p>
                </div>

                <div className="card border border-base-300 bg-base-100 shadow-xl">
                    <div className="card-body">
                        <Form
                            method="POST"
                            action="./"
                            className="flex flex-col gap-5"
                        >
                            <label className="floating-label">
                                <span>First Name</span>

                                <input
                                    name="first"
                                    type="text"
                                    defaultValue={contact.name.first}
                                    placeholder="First Name"
                                    className="input input-bordered w-full transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                                    required
                                />
                            </label>

                            <label className="floating-label">
                                <span>Last Name</span>

                                <input
                                    name="last"
                                    type="text"
                                    defaultValue={contact.name.last}
                                    placeholder="Last Name"
                                    className="input input-bordered w-full transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                                    required
                                />
                            </label>

                            <label className="floating-label">
                                <span>Email Address</span>

                                <input
                                    name="email"
                                    type="email"
                                    defaultValue={contact.email}
                                    placeholder="Email Address"
                                    className="input input-bordered w-full transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                                    required
                                />
                            </label>

                            <div className="mt-2 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                                <a
                                    href={`/contacts/${contact.login.uuid}`}
                                    className="btn btn-ghost"
                                >
                                    Cancel
                                </a>

                                <button
                                    type="submit"
                                    className="btn btn-primary shadow-md shadow-primary/20"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes update-page-in {
                    from {
                        opacity: 0;
                        transform: translateY(8px);
                    }

                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-update-page {
                    animation: update-page-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) both;
                }

                @media (prefers-reduced-motion: reduce) {
                    .animate-update-page {
                        animation: none;
                    }
                }
            `}</style>
        </main>
    );
};

export default ContactUpdatePage;