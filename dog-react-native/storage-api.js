import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addImagePath, addProfilePic } from "./api";

const storage = getStorage();

const imageRef = ref(storage, "image");

function uploadImage(file, name) {
  return uploadBytes(ref(storage, name), file)
    .then((snapshot) => {
      console.log("Uploaded a  file!");
      return snapshot;
    })
    .catch((error) => {
      console.log({ error, code: error.code });
    });
}

function getImageUrl(name) {
  return getDownloadURL(ref(storage, name)).catch((error) => {
    console.log({ error, code: error.code });
  });
}

function userUploadImage(file) {
  const name = Date.now().toString();
  uploadImage(file, name)
    .then(() => {
      addImagePath(name);
    })
    .catch((error) => console.log({ error, code: error.code }));
}

function userUploadProfileImage(file) {
  const name = Date.now().toString();
  uploadImage(file, name)
    .then(() => {
      addProfilePic(name);
    })
    .catch((error) => console.log({ error, code: error.code }));
}

export {
  imageRef,
  uploadImage,
  getImageUrl,
  userUploadImage,
  userUploadProfileImage,
};
