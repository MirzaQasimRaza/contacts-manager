import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";

import RootLayout from "./Components/RootLayout";

import HomePage from "./Pages/Home";

import ContactsPage, {
    contactsLoader,
    createContactAction,
} from "./Pages/Contacts";

import NotFound from "./Pages/NotFound";

import ContactDetailsPage, {
    contactLoaderById,
} from "./Pages/ContactDetails";

import ContactUpdatePage, {
    contactUpdateAction,
    contactUpdateLoader,
} from "./Pages/ContactUpdate";

import { DestroyContactAction } from "./Pages/ContactDestroy";

import InfoPage from "./Pages/Info";
import SettingsPage from "./Pages/Settings";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route
            path=""
            element={<RootLayout />}
            errorElement={<NotFound />}
        >
            <Route
                path="/"
                element={<HomePage />}
            />

            <Route
                path="/contacts"
                element={<ContactsPage />}
                loader={contactsLoader}
                action={createContactAction}
            />

            <Route
                path="/contacts/:contactId"
                element={<ContactDetailsPage />}
                loader={contactLoaderById}
            />

            <Route
                path="/contacts/:contactId/update"
                element={<ContactUpdatePage />}
                loader={contactUpdateLoader}
                action={contactUpdateAction}
            />

            <Route
                path="/contacts/:contactId/destroy"
                action={DestroyContactAction}
            />

            <Route
                path="/about/info"
                element={<InfoPage />}
            />

            <Route
                path="/about/settings"
                element={<SettingsPage />}
            />
        </Route>
    )
);