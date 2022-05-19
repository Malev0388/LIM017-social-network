import { onNavigate } from '../main.js';
import { savePost, getPost, onGetPost, deletePost, getEdit, updatePost } from '../firebase/authFunctions.js';

export const Login = () => {
  /*const nameLogIn = getCurrentUser().displayName;
  const uidLogIn = getCurrentUser().uid;*/
  const LoginMain = document.createElement('main');
  LoginMain.classList.add('loginMain');
  LoginMain.innerHTML = /*html*/
   `<header id="backgroundHeader">
        <img class="isotype" src="./img/iconUser.svg">
          <!--<div>
            <input type="text" id="nickNameHeader" class="infoRegisterHeader">
          </div>-->
        <button id="loginOutBtn"><img class="loginOutIcon" src="./img/iconoLoginOut.svg"></button>
  </header>

  <!--Container text post, función publicar -->
  <br>
  <section id="postContainer">
    <form id="postForm">
      <div id="postUser" class="postUserStyle">
        <textarea placeholder="Desahógate..." type="text" id="txtUserPost" class="userInfoPost"></textarea>
      </div>
        <div>
          <button id="buttonPost">Publicar</button>
       </div>
    </form>
    <div id="newContainerPost"></div>
  </section>`;
  
  /*Container cerrar sesión*/
  //LoginMain.querySelector('#loginOutBtn').addEventListener('click', () => onNavigate('/'));
  const newContainerPost = LoginMain.querySelector("#newContainerPost");
  const postForm = LoginMain.querySelector("#postForm");
  let editStatus = false;
  let id = '';

  /*Container de post*/
  
  /*window.addEventListener('DOMContentLoaded', async (e) => {*/
    //const querySnapshot = await getPost();  
    //querySnapshot.forEach(doc => {
    onGetPost((querySnapshot) => {
      newContainerPost.innerHTML = "";
      querySnapshot.forEach((doc) => {
      const task = doc.data();
      newContainerPost.innerHTML += 
      `<br>
      <section class="newContainerPost">
        <div id="postContainerFriend1">
          <div id="postFriend1" class="postFriendStyle">
            <img class="cloudTxtIcon" src="./img/iconUser.svg">
          </div>
            <div>
              <p id="txtFriend" class="txtFriendStyle">${task.contentUserPost}</p>
          </div>
              <div id="likesAndComments" class="likesAndCommentsStyle">
                    <button class="btn-Edit" data-id="${doc.id}">Editar</button>
                      <button class="btn-Trash" data-id="${doc.id}">Eliminar</button>
              </div>
        </div>      
      </section>`
  ;
/*Función para borrar post*/
    const btnDelete = newContainerPost.querySelectorAll(".btn-Trash");
    btnDelete.forEach(btn => {
      btn.addEventListener("click", ({target:{dataset}}) => {
        deletePost(dataset.id)
    })
  })
/*Función para editar post*/
  const btnEdit = newContainerPost.querySelectorAll(".btn-Edit");
    btnEdit.forEach((btn) => {
      btn.addEventListener("click", async (e) => {
      const doc = await getEdit(e.target.dataset.id)
      //console.log(doc.data())
      const task = doc.data();
      
      const contentUserPost = document.getElementById('txtUserPost').value = task.contentUserPost
      editStatus = true;
      id = doc.id;
      //document.getElementById('buttonPost').innerText = 'UpDate'
 })
})

 })
})
/*Función para actualizar post y salvar información*/
  LoginMain.querySelector('#buttonPost').addEventListener('click', (e) => {
      e.preventDefault()
      
      if(!editStatus) {
        const contentUserPost = document.getElementById('txtUserPost').value;
        savePost(contentUserPost)
      } 
      else {
        const contentUserPost = document.getElementById('txtUserPost').value;
        updatePost(id, {contentUserPost});

        editStatus = false;
      }      

      const eraser = document.getElementById('postForm').reset();
      
  });  

  /*const backgroundLogin = document.getElementById('bodies');
  const LoginBackground = document.createElement('section');
  LoginBackground.innerHTML = `<section>
      <main id="bgLogin" class="loginBackground">
      </main>
  </section>`;

  LoginMain.appendChild(LoginBackground);
    
    //backgroundLogin.classList.remove('loginBackground');
    backgroundLogin.classList.add('loginBackground');

    /*Container cerrar sesión
  LoginMain.querySelector('#loginOutBtn').addEventListener('click', () => {
    backgroundLogin.classList.remove('loginBackground');
    backgroundLogin.classList.add('bodyBackground');
    onNavigate('/')
});*/

 return LoginMain;

}
