
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addImagePath } from "./api";

// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = getStorage();

// Create a storage reference from our storage service
const storageRef = ref(storage);
const imageRef = ref(storage, 'image');
// 'file' comes from the Blob or File API


function uploadImage(file,name){
return uploadBytes(ref(storage, name), file).then((snapshot) => {
    
    console.log('Uploaded a blob or file!');
    console.log(snapshot);
  }).catch(error=>{console.log({error});})
}


const starsRef = ref(storage, 'images/stars.jpg');
function getImageUrl(name){
// Get the download URL
return getDownloadURL(ref(storage, name))
  .then((url) => {
    return url
    // Insert url into an <img> tag to "download"
  })
  .catch((error) => {
    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
    console.log({error,code:error.code});
    switch (error.code) {
      case 'storage/object-not-found':
        // File doesn't exist
        break;
      case 'storage/unauthorized':
        // User doesn't have permission to access the object
        break;
      case 'storage/canceled':
        // User canceled the upload
        break;
      case 'storage/unknown':
        // Unknown error occurred, inspect the server response
        break;
    }
  });
}

function userUploadImage(file){
  const name= Date.now().toString()
  console.log({name});
uploadImage(file,name).then(()=>{
  addImagePath(name)
})
}

export {imageRef, uploadImage, getImageUrl, userUploadImage}