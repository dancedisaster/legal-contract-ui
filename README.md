# Legal Contracts Frontend

This is the frontend application for the Legal Contracts Management system, built with **Vue 3**, **TypeScript**, **Vite**, **Pinia**, and **TailwindCSS**. It communicates with a .NET 8 RESTful API backend.

---

## 🛠 Tech Stack

- **Framework:** Vue 3 + TypeScript
- **Build Tool:** Vite
- **State Management:** Pinia
- **UI Framework:** Element Plus
- **Styling:** TailwindCSS
- **Internationalization:** Vue I18n
- **Testing:** Vitest + Vue Test Utils

---

## 🚀 Getting Started

### Prerequisites

- [Node.js v18+](https://nodejs.org/)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

---

### 📦 Install Dependencies

```bash
npm install
```


Run the App in Development Mode:
```bash
 npm run build
 ```

 🧪 Run Unit Tests
```bash
npm run test
```


###  Internationalization (i18n)

The project uses Vue I18n for multi-language support.
Translations are stored as JSON files in src/i18n/ (e.g. en.json, pt.json).
To change the default language, update the locale in src/i18n/index.ts.

### State Management with Pinia

Global state is managed via Pinia.
Stores are located in src/stores/.
You can use them in components with:

const myStore = useMyStore()

### Project Structure

├── public/                 # Static assets
├── src/
│   ├── assets/            # Images and other assets
│   ├── components/        # Reusable components
│   ├── layouts/           # Layouts and wrappers
│   ├── pages/             # Views and page-level components
│   ├── router/            # Vue Router configuration
│   ├── stores/            # Pinia state management
│   ├── i18n/              # Translation files
│   ├── services/          # Axios API clients
│   ├── types/             # TypeScript interfaces and types
│   ├── App.vue            # Root component
│   └── main.ts            # Entry point
├── tests/                 # Unit and component tests
├── vite.config.ts         # Vite configuration
