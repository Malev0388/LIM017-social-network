import { loginGoogle, signInWithEmail, onNavigate } from '../firebase/authFunctions.js';

export const Welcome = () => {
  const WelcomeDiv = document.createElement('section');
  WelcomeDiv.innerHTML = `<section>
   <main class="container">
     <img class="logotype" src="./img/LogoTellMe.svg">
    <div>
        <br>
        <p id="welcomeApp" class="welcomeApp">¡Bienvenid@!</p>
          <input placeholder="Email" type="email" id="email" class="userInfo">
        <br>
        <br>
          <input placeholder="Password" id="password" class="userInfo" type="password">
         <button id="buttonLogin">Iniciar sesión</button>
         <p class="ingresoGoogle">O bien ingresa con...</p>
    </div>
        <div>
          <button id="googleBtn"><img class="googleIcon" src="./img/iconGoogle.svg"></button>
        </div>
          <div>
            <p class="questionPassword">¿Olvidaste tu contraseña?</p>
          </div>
            <div class="createLoginContent">
              <p class="createLogin">¿No tienes una cuenta?<button id="buttonRegister"><u>Regístrate</u></button></p>
            </div>
    </main>
    </section>`;

  const BackgroundMobile = document.createElement('main');
  BackgroundMobile.innerHTML = `<main>
      <img class="mobile" src="./img/bgMobile.jpg">
    </main>`;

  WelcomeDiv.appendChild(BackgroundMobile);

  WelcomeDiv.classList.add('WelcomeDiv');

  WelcomeDiv.querySelector('#buttonLogin').addEventListener('click', () => {
    const loginEmail = document.getElementById('email').value;
    const loginPassword = document.getElementById('password').value;
    signInWithEmail(loginEmail, loginPassword);
  });

  WelcomeDiv.querySelector('#buttonRegister').addEventListener('click', () => onNavigate('/register'));

  WelcomeDiv.querySelector('#googleBtn').addEventListener('click', () => loginGoogle());

  WelcomeDiv.querySelector('#buttonRegister').addEventListener('click', () => {
    const backgroundBody = document.getElementById('bodies');
    backgroundBody.classList.remove('bodyBackground');
    backgroundBody.classList.add('containerBackground');
  });

  return WelcomeDiv;
};
