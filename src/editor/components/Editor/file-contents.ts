export const indexHtml = `
<div id="app"></div>
`;

export const appTsx = `
export function App() {
  return (
    <div>
      <h1>hello, world</h1>
    </div>
  );
};
`.trim();

export const indexTsx = `
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './App';

const root = createRoot(document.getElementById('app'));

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

`.trim();

export const packageJson = `
{
  "name": "react-app",
  "version": "0.0.0",
  "private": true,
  "dependencies": {
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "@types/react": "18.2.35",
    "@types/react-dom": "18.2.14"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
  },
  "devDependencies": {
    "react-scripts": "latest",
    "typescript": "latest"
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
`.trim();

export const tsconfigJson = `
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "lib": ["DOM", "ES2022"],
    "moduleResolution": "node",
    "target": "ES2022"
  }
}
`.trim();
