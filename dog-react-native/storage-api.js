import { getStorage, ref, uploadBytes } from "firebase/storage";

// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = getStorage();

// Create a storage reference from our storage service
const storageRef = ref(storage);
const imageRef = ref(storage, 'image');
// 'file' comes from the Blob or File API


function uploadImage(file,name){
uploadBytes(ref(storage, name), file).then((snapshot) => {
    
    console.log('Uploaded a blob or file!');
    console.log(snapshot);
  }).catch(error=>{console.log({error});})
}


export {imageRef}