import { app } from './firebaseConfig.js';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  getFirestore,
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
}
  from './firebaseImports.js';
import { onNavigate } from '../main.js';

export {
  onNavigate };

const auth = getAuth();
export const db = getFirestore();

export const registerWithEmail = (loginEmail, loginPassword, loginName) => {
  createUserWithEmailAndPassword(auth, loginEmail, loginPassword)
    .then(() => {
      try {
      addDoc(collection(db, 'RegisterTellMe'), {
          newNickName: loginName,
          newEmail: loginEmail,
          //newPassword: loginPassword,
        });
        swal.fire({
          title: '<p class="txtConfirmSwal">Te registraste con éxito</p>',
          icon: 'success',
          confirmButtonText: '<p class="txtBtnConfirmSwal">¡Comencemos!</p>',
          showConfirmButton: 'true',
          confirmButtonColor: '#471F54',
          buttonsStyling: 'false',
          customClass: {
            confirmButton: 'confirmButtonStyle',
          },
        })
          .then((result) => {
            if (result) {
              location.href = ('/');
            }
          });
      }
      catch (e) {
        console.error('Error, el correo ya se encuentra registrado', e);
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert('Error, debes ingresar datos correctos');
    });
};

export const signInWithEmail = (loginEmail, loginPassword) => {
  return signInWithEmailAndPassword(auth, loginEmail, loginPassword)
    .then((userCredential) => {
      const user = userCredential.user;
      onNavigate('/login');
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const wrongMessage = 'Debes registrarte para iniciar sesión';
      alert(wrongMessage);
    });
};

export const loginGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const user = result.user;
      onNavigate('/login');
      return user;
    }).catch((error) => {
      onNavigate('/login');
    });
};

export const savePost = (contentUserPost) => {
  addDoc(collection(db, 'postUser'), { contentUserPost });
};

export const getPost = async () => {
  try{
    return await getDocs(collection(db, 'postUser'))
  }
  catch(error){
    throw error
  }
};

export const onGetPost = (callback) =>
  onSnapshot(collection(db, 'postUser'), callback);

export const deletePost = (id) => deleteDoc(doc(db, 'postUser', id));

export const getEdit = (id) => getDoc(doc(db, 'postUser', id));

export const updatePost = (id, newFields) =>
  updateDoc(doc(db, 'postUser', id), newFields);

  export const getCurrentUser = () => getAuth().currentUser;