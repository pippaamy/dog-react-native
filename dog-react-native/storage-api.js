import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  listAll,
} from "firebase/storage";
import {
  addImagePath,
  addProfilePic,
  getUserDatabyUID,
  patchProfile,
  removeImagePath,
} from "./api";
import { auth } from "./firebase";

const storage = getStorage();

const imageRef = ref(storage, "image");

function uploadImage(file, name_make_it_unique, catchFunction) {
  return uploadBytes(ref(storage, name_make_it_unique), file)
    .then((snapshot) => {
      console.log("Uploaded file" + name_make_it_unique);
      return snapshot;
    })
    .catch(
      catchFunction ||
        ((error) => {
          console.log({ errorMessage: error.message, error });
        })
    );
}
function uploadImageFromUri(uri, name_make_it_unique, catchFunction) {
  return fetch(uri)
    .then((res) => res.blob())
    .then((blob) => {
      console.log(blob)
      /// dont ask me why this console log is needed to make the function work it just does
      return userUploadImage(blob, name_make_it_unique);
    })
    .catch(
      catchFunction ||
        ((error) => {
          console.log({ errorMessage: error.message, error });
        })
    );
}
function old_uploadProfileImagefromUri(
  uri,
  name_make_it_unique,
  catchFunction
) {
  return fetch(uri)
    .then((res) => res.blob())
    .then((blob) => {
      userUploadProfileImage_Old(blob, name_make_it_unique);
    })
    .catch(
      catchFunction ||
        ((error) => {
          console.log({ errorMessage: error.message, error });
        })
    );
}

function getImageUrl(path, catchFunction) {
  return getDownloadURL(ref(storage, path)).catch(
    catchFunction ||
      ((error) => {
        console.log({ errorMessage: error.message, error });
      })
  );
}

function userUploadImage(file, uniqueName_eg_DateNow, catchFunction) {
  return uploadImage(file, uniqueName_eg_DateNow)
    .then(() => {
      console.log("image uploaded");
      addImagePath(uniqueName_eg_DateNow);
    })
    .catch(
      catchFunction ||
        ((error) => {
          console.log({ error, code: error.code });
        })
    );
}

function userUploadProfileImage_Old(
  file,
  uniqueName_eg_DateNow,
  catchFunction
) {
  return uploadImage(file, uniqueName_eg_DateNow)
    .then((res) => {
      addProfilePic(uniqueName_eg_DateNow);
      console.log("profile pic updated");
      return res;
    })
    .catch(
      catchFunction ||
        ((error) => {
          console.log({ errorMessage: error.message, error });
        })
    );
}

function deleteImage(imagePath, catchFunction) {
  if (typeof(imagePath)!=='string'){
    console.log('Image path must be a string');
    return new Promise()
  } else if(imagePath.length >8){ 
    return getUserDatabyUID(auth.currentUser.uid)
    .then(({imagePaths})=>{
       if(!imagePaths.includes(imagePath)){
      console.log("doesn't belong to logged in user or doesnt exist! try deleteImageNoWarn ");
    }else return deleteObject(ref(storage, imagePath))
    .then(() => {
      console.log("File " + imagePath + " deleted successfully");
      return removeImagePath(imagePath)
    })
    .catch(
      catchFunction ||
        ((error) => {
          console.log({ errorMessage: error.message, error });
        })
    )
    }).catch(catchFunction || console.log)
   } else{
      console.log("Are you sure you want to delete all images starting with"+imagePath+"?, use deleteImageNoWarn");
      return new Promise()
    }
}
function deleteImageNoWarn(imagePath, catchFunction) {
  return deleteObject(ref(storage, imagePath))
    .then(() => {
      console.log("File " + imagePath + " deleted successfully");
      return removeImagePath(imagePath)
    })
    .catch(
      catchFunction ||
        ((error) => {
          console.log({ errorMessage: error.message, error });
        })
    )
}

function getAllImagePaths(catchFunction) {
  return listAll(ref(storage))
    .then((res) => {
      return res.items.map((item) => item.fullPath);
    })
    .catch(
      catchFunction ||
        ((error) => {
          console.log({ errorMessage: error.message, error });
        })
    );
}
async function getAllImageURLs(catchFunction) {
  return getAllImagePaths(catchFunction)
    .then((paths) => {
      return Promise.all(paths.map(async (path) => await getImageUrl(path)));
    })
    .catch(
      catchFunction ||
        ((error) => {
          console.log({ errorMessage: error.message, error });
        })
    );
}
function getAllImageURLsByUser(uid, catchFunction) {
  return getUserDatabyUID(uid)
    .then((data) => {
      return Promise.all(
        data.imagePaths.map(async (path) => await getImageUrl(path))
      );
    })
    .catch(
      catchFunction ||
        ((error) => {
          console.log({ errorMessage: error.message, error });
        })
    );
}
function uploadProfileImagefromFile(file, path) {
  if (!path) path = Date.now().toString();
  return userUploadProfileImage_Old(file, path)
    .then(() => {
      return getImageUrl(path);
    })
    .then((url) => patchProfile(undefined, url));
}
function uploadProfileImagefromUri(uri, path) {
  if (!path) path = Date.now().toString();
  return old_uploadProfileImagefromUri(uri, path)
    .then(() => {
      return getImageUrl(path);
    })
    .then((url) => patchProfile(undefined, url));
}
function getDogImageUrls(optionalCatchFunction) {
  let pathArray = [];
  const obj = {};
  return getUserDatabyUID(auth.currentUser.uid)
    .then((data) => {
      return data.imagePaths;
    })
    .then((imagePaths) => {
      pathArray = imagePaths;
      return Promise.all(
        imagePaths.map((path) => {
          return getImageUrl(path);
        })
      );
    })
    .then((imageUrls) => {
      imageUrls.forEach((url, index) => {
        const name = pathArray[index].split("_")[0].toUpperCase();
        if (obj.hasOwnProperty(name)) {
          obj[name].push(url);
        } else obj[name] = [url];
      });
      return obj;
    })
    .catch(
      optionalCatchFunction ||
        ((error) => console.log({ errMessage: error.message, error }))
    );
}
export {
  deleteImageNoWarn,
  getDogImageUrls,
  uploadProfileImagefromUri,
  uploadProfileImagefromFile,
  getAllImageURLsByUser,
  getAllImageURLs,
  imageRef,
  // uploadImage,
  getImageUrl,
  userUploadImage,
  userUploadProfileImage_Old,
  deleteImage,
  storage,
  getAllImagePaths,
  uploadImageFromUri,
  old_uploadProfileImagefromUri,
};
