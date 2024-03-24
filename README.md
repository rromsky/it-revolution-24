# MiniLink App [Desktop Only] - Під мобільні розміри не оптимізовано
## Цей проект вже був розгорнений за посиланням [https://rromsky.tech/it-revolution-24/](https://rromsky.tech/it-revolution-24/#/)
### Не дивлячись на шифрування даних, не раджу використовувати власний логін та пароль. 

## Для початку роботи:
### Налаштування середовища:
```bash
npm install -g yarn
yarn
yarn run dev
```

## Локальне розгортання
Оскільки цей проект використовує технологію react-router-dom, він потребував спецефічного налаштування, для розгортання на github pages, тому для коректної роботи в локальному середовищі, варто замінити наступні речі:

### package.json - прибрати рядок:
```js
"homepage": "https://rromsky.tech/it-revolution-24/",
```

### /src/main.tsx - замінити
```typescript
import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import App from "./App.tsx";
import UrlPage from "./pages/url/index.tsx";
import Error404 from "./pages/error/404.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
const basename = "/";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HashRouter basename={basename}>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/url">
          <Route path="*" element={<UrlPage />} />
        </Route>
        <Route path="/admin" element={<UrlPage />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
      <ToastContainer />
    </HashRouter>
  </React.StrictMode>
);

```
на 
```typescript
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.tsx";
import UrlPage from "./pages/url/index.tsx";
import Error404 from "./pages/error/404.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/url">
          <Route path="*" element={<UrlPage />} />
        </Route>
        <Route path="/admin" element={<UrlPage />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
      <ToastContainer />
    </HashRouter>
  </React.StrictMode>
);
```

### vite.config.js - прибрати

```js
  base: "/it-revolution-24/",
```
