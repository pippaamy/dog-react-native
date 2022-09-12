import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  listAll,
} from "firebase/storage";
import { addImagePath, addProfilePic, getUserDatabyUID } from "./api";
import { auth } from "./firebase";

const storage = getStorage();

const imageRef = ref(storage, "image");

function uploadImage(file, name_make_it_unique,catchFunction) {
  return uploadBytes(ref(storage, name_make_it_unique), file)
    .then((snapshot) => {
      console.log("Uploaded file" + name_make_it_unique);
      return snapshot;
    })
    .catch(catchFunction||((error) => {
      console.log({ errorMessage: error.message, error });
    }));
}
function uploadImageFromUri(uri, name_make_it_unique, catchFunction) {
  return fetch(uri)
    .then((res) => res.blob())
    .then((blob) => {
      userUploadImage(blob, name_make_it_unique);
    }) .catch(catchFunction||((error) => {
      console.log({ errorMessage: error.message, error});
    }));
}
function uploadProfileImageFromUri(uri, name_make_it_unique, catchFunction) {
  return fetch(uri)
    .then((res) => res.blob())
    .then((blob) => {
      userUploadProfileImage(blob, name_make_it_unique);
    }) .catch(catchFunction||((error) => {
      console.log({ errorMessage: error.message, error });
    }));
}

function getImageUrl(path, catchFunction) {
  return getDownloadURL(ref(storage, path)) .catch(catchFunction||((error) => {
    console.log({ errorMessage: error.message, error });
  }));
}

function userUploadImage(file, uniqueName_eg_DateNow, catchFunction) {
  return uploadImage(file, uniqueName_eg_DateNow)
    .then(() => {
      console.log("image uploaded");
      addImagePath(uniqueName_eg_DateNow);
    }) .catch(catchFunction||((error) => {
      console.log({ error, code: error.code });
    }));
}

function userUploadProfileImage(file, uniqueName_eg_DateNow, catchFunction) {
  return uploadImage(file, uniqueName_eg_DateNow)
    .then(() => {
      addProfilePic(uniqueName_eg_DateNow);
      console.log("profile pic updated");
    }) .catch(catchFunction||((error) => {
      console.log({errorMessage: error.message, error });
    }));
}

function deleteImage(imageName, catchFunction) {
  return deleteObject(ref(storage, imageName))
    .then(() => {
      console.log("File" + imageName + "deleted successfully");
    }) .catch(catchFunction||((error) => {
      console.log({ errorMessage: error.message, error });
    }));
}
function getAllImagePaths(catchFunction) {
  return listAll(ref(storage))
    .then((res) => {
      return res.items.map((item) => item.fullPath);
    }) .catch(catchFunction||((error) => {
      console.log({errorMessage: error.message, error });
    }));
}
async function getAllImageURLs(catchFunction){
  return getAllImagePaths(catchFunction)
  .then((paths)=>{
    return Promise.all( paths.map(async path=>await getImageUrl(path)))
  }).catch(catchFunction||((error) => {
    console.log({errorMessage: error.message, error });
  }));
}
function getAllImageURLsByUser(uid,catchFunction){
    return getUserDatabyUID(uid)
    .then(data=>{
      return Promise.all (data.imagePaths.map(async (path)=> await getImageUrl(path))
      )
    })
    .catch(catchFunction||((error) => {
      console.log({ errorMessage: error.message, error });
    }));
  }

export {
  getAllImageURLsByUser,
  getAllImageURLs,
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
