import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { addImagePath, addProfilePic } from "./api";

const storage = getStorage();

const imageRef = ref(storage, "image");

function uploadImage(file, name_make_it_unique) {
  return uploadBytes(ref(storage, name_make_it_unique), file)
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

function userUploadImage(file, uniqueName_eg_DateNow) {
  return uploadImage(file, uniqueName_eg_DateNow)
    .then(() => {
      addImagePath(uniqueName_eg_DateNow);
    })
    .catch((error) => console.log({ error, code: error.code }));
}

function userUploadProfileImage(file, uniqueName_eg_DateNow) {
  return uploadImage(file, uniqueName_eg_DateNow)
    .then(() => {
      addProfilePic(uniqueName_eg_DateNow);
    })
    .catch((error) => console.log({ error, code: error.code }));
}

function deleteImage(imageName) {
  return deleteObject(ref(storage, imageName))
    .then(() => {
      console.log("File deleted successfully");
    })
    .catch((error) => {
      console.log("Uh-oh, an error occurred!", { error });
    });
}
export {
  imageRef,
  uploadImage,
  getImageUrl,
  userUploadImage,
  userUploadProfileImage,
  deleteImage,
};
