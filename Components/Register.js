import { onNavigate } from '../main.js';
import { registerWithEmail } from '../firebase/authFunctions.js';

export const Register = () => {
  const RegisterSection = document.createElement('section');
  RegisterSection.innerHTML = `<section>
      <main id="containerRegister" class="containerRegister">
        <p id="registerApp" class="registerApp">Regístrate</p>
        <div id="formRegister" class="txtRegister">
            <div id="nickNameLabel">
              <p class="txtAccount">Nickname</p>
              <input type="text" id="nickName" class="infoRegister">
            </div>
              <div>
                <p class="txtAccount">Email</p>
                <input type="email" id="email" class="infoRegister">
              </div>
                <div id="passwordLabel">
                  <p class="txtAccount">Password</p>
                  <input id="password" class="infoRegister" type="password" placeholder= "Ingrese solo 6 caracteres" minlength="6" maxlength="10" required/>
                </div>
              <button type="submit" id="buttonAccount">Crear cuenta</button>
              <p id="txtError" class="text-error"></p>
                <div class="questionReturnHome">
                  <p class="questionAccount">¿Ya tienes una cuenta?<button id="buttonReturnHome"><u>Ingresa aquí</u></button></p>
                </div>
         </div>
    </main>
  </section>`;

  const LogotypeSection = document.createElement('section');
  LogotypeSection.innerHTML = `<section id="containerLogotype">
      <img class="logotypeRegister" src="./img/LogoTellMeBlanco.svg">
  </section>`;

  const ContainerBackground = document.createElement('section');
  ContainerBackground.innerHTML = `<section>
      <main class="containerBackground">
      </main>
  </section>`;

  RegisterSection.appendChild(ContainerBackground);
  RegisterSection.appendChild(LogotypeSection);

  RegisterSection.classList.add('RegisterSection');

  RegisterSection.querySelector('#buttonAccount').addEventListener('click', () => {
    const loginEmail = document.getElementById('email').value;
    const loginPassword = document.getElementById('password').value;
    const loginName = document.getElementById('nickName').value;
    registerWithEmail(loginEmail, loginPassword, loginName);
  });

  RegisterSection.querySelector('#buttonReturnHome').addEventListener('click', () => {
    const backgroundBody = document.getElementById('bodies');
    backgroundBody.classList.remove('containerBackground');
    backgroundBody.classList.add('bodyBackground');
    onNavigate('/');
  });

  return RegisterSection;
};
