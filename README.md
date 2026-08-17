# Contacts Manager

A responsive contact management application built with **React, TypeScript, and Vite**.

The application provides a clean and intuitive interface for managing contacts, including creating, viewing, editing, duplicating, and deleting contacts.

---

## Features

- Create new contacts
- View contact details
- Edit existing contacts
- Duplicate contacts
- Delete contacts with confirmation
- Responsive design for desktop, tablet, and mobile devices
- Client-side routing with React Router
- Loading states
- Confirmation dialogs for destructive actions
- Clean and modern user interface

---

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- React Router
- Tailwind CSS
- DaisyUI

### API

The project also includes a **NestJS API setup** used as part of the course/project environment.

---

## Project Structure

```text
Contacts Manager/
│
├── contact-manager/
│   ├── public/
│   ├── src/
│   │   ├── Components/
│   │   ├── Pages/
│   │   ├── assets/
│   │   ├── contacts-api/
│   │   ├── App.tsx
│   │   ├── index.css
│   │   ├── main.tsx
│   │   ├── routes.tsx
│   │   └── types.ts
│   ├── package.json
│   ├── vite.config.ts
│   └── ...
│
└── contacts-api/
    ├── src/
    │   ├── contacts/
    │   ├── app.controller.ts
    │   ├── app.module.ts
    │   └── ...
    ├── package.json
    └── ...
