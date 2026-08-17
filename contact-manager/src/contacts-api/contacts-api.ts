import type { Contact } from "../types";

export const getContacts = async () => {
    const response = await fetch("http://localhost:3000/contacts");

    if (!response.ok) {
        throw new Error("Failed to load the contacts from the server");
    }

    const contactResp = await response.json();

    return contactResp.contacts as Contact[];
};

export const createContact = async (contact: Partial<Contact>) => {
    const response = await fetch("http://localhost:3000/contacts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(contact),
    });

    if (!response.ok) {
        throw new Error("Failed to create new contact");
    }

    const newContact = await response.json();

    return {
        contact: newContact,
    };
};

export const getContactById = async (uuid: string) => {
    const contacts = await getContacts();

    return contacts.find((contactItem) => {
        return contactItem.login.uuid === uuid;
    });
};

export const deleteContactById = async (contactId: string) => {
    const response = await fetch(
        `http://localhost:3000/contacts/${contactId}`,
        {
            method: "DELETE",
        }
    );

    if (!response.ok) {
        throw new Error("Failed to delete contact");
    }
};

export const updateContactById = async (
    contactId: string,
    contact: Partial<Contact>
) => {
    const response = await fetch(
        `http://localhost:3000/contacts/${contactId}`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(contact),
        }
    );

    if (!response.ok) {
        throw new Error("Failed to update contact");
    }

    const updatedContact = await response.json();

    return {
        contact: updatedContact,
    };
};