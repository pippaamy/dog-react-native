import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  listAll,
} from "firebase/storage";
import { addImagePath, addProfilePic } from "./api";

const storage = getStorage();

const imageRef = ref(storage, "image");

function uploadImage(file, name_make_it_unique) {
  return uploadBytes(ref(storage, name_make_it_unique), file)
    .then((snapshot) => {
      console.log("Uploaded file" + name_make_it_unique);
      return snapshot;
    })
    .catch((error) => {
      console.log({ error, code: error.code });
    });
}
function uploadImageFromUri(uri, name_make_it_unique) {
  return fetch(uri)
    .then((res) => res.blob())
    .then((blob) => {
      userUploadImage(blob, name_make_it_unique);
    });
}
function uploadProfileImageFromUri(uri, name_make_it_unique) {
  return fetch(uri)
    .then((res) => res.blob())
    .then((blob) => {
      userUploadProfileImage(blob, name_make_it_unique);
    });
}

function getImageUrl(path) {
  return getDownloadURL(ref(storage, path)).catch((error) => {
    console.log({ error, code: error.code });
  });
}

function userUploadImage(file, uniqueName_eg_DateNow) {
  return uploadImage(file, uniqueName_eg_DateNow)
    .then(() => {
      console.log("image uploaded");
      addImagePath(uniqueName_eg_DateNow);
    })
    .catch((error) => console.log({ error, code: error.code }));
}

function userUploadProfileImage(file, uniqueName_eg_DateNow) {
  return uploadImage(file, uniqueName_eg_DateNow)
    .then(() => {
      addProfilePic(uniqueName_eg_DateNow);
      console.log("profile pic updated");
    })
    .catch((error) => console.log({ error, code: error.code }));
}

function deleteImage(imageName) {
  return deleteObject(ref(storage, imageName))
    .then(() => {
      console.log("File" + imageName + "deleted successfully");
    })
    .catch((error) => {
      console.log("Uh-oh, an error occurred!", { error });
    });
}
function getAllImagePaths() {
  return listAll(ref(storage))
    .then((res) => {
      return res.items.map((item) => item.fullPath);
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
  storage,
  getAllImagePaths,
  uploadImageFromUri,
  uploadProfileImageFromUri,
};
