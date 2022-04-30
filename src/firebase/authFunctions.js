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
}
  from './firebaseImports.js';
import { onNavigate } from '../main.js';

const auth = getAuth();
export const db = getFirestore();

export const registerWithEmail = (loginEmail, loginPassword, loginName) => {
  createUserWithEmailAndPassword(auth, loginEmail, loginPassword)
    .then(() => {
      try {
      addDoc(collection(db, 'RegisterTellMe'), {
          newNickName: loginName,
          newEmail: loginEmail,
          newPassword: loginPassword,
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
  addDoc(collection(db, 'postUser'), {
      newPost: contentUserPost,
    });
};

export const getPost = () => {
  getDocs(collection(db, 'postUser'))
};
