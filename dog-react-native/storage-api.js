import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addImagePath } from "./api";

const storage = getStorage();

const imageRef = ref(storage, "image");
// 'file' comes from the Blob or File API

function uploadImage(file, name) {
  return uploadBytes(ref(storage, name), file)
    .then((snapshot) => {
      console.log("Uploaded a  file!");
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
  console.log({ name });
  uploadImage(file, name).then(() => {
    addImagePath(name);
  });
}

export { imageRef, uploadImage, getImageUrl, userUploadImage };
