import { Welcome } from './components/Welcome.js';
import { Register } from './components/Register.js';
import { Login } from './components/Login.js';

const rootDiv = document.getElementById('root') ? document.getElementById('root') : document.createElement('div');

const routes = {
  '/': Welcome,
  '/register': Register,
  '/login': Login,
};

export const onNavigate = (pathname) => {
  window.history.pushState(
    {},
    pathname,
    window.location.origin + pathname,
  );

  while (rootDiv.firstChild) {
    rootDiv.removeChild(rootDiv.firstChild);
  }

  rootDiv.appendChild(routes[pathname]());
};


window.addEventListener("DOMContentLoaded",()=>{
const components = routes[window.location.pathname];
rootDiv.appendChild(components());
});