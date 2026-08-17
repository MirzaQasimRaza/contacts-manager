import {
    redirect,
    type ActionFunction,
} from "react-router-dom";

import { deleteContactById } from "../contacts-api/contacts-api";

export const DestroyContactAction: ActionFunction = async ({
    params,
}) => {
    const contactId = params.contactId;

    if (!contactId) {
        throw new Error("Contact ID not provided.");
    }

    await deleteContactById(contactId);

    sessionStorage.setItem(
        "cms-toast",
        "Contact deleted successfully"
    );

    return redirect("/contacts");
};