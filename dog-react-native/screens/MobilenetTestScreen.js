import { Text, View } from "react-native";
// import * as mobilenet from 

const MobilenetScreen = () => {
  
    const FR = new FileReader
    function onFileChange(event){
      const file=event.target.files[0]
      // uploadBytes(imageRef, file).then((snapshot) => {
      //   console.log('Uploaded a blob or file!');
      //   console.log(snapshot);
      // }).catch((error)=>console.log({error}))
     const img = <img src={Eeviepom} alt="eevie" />
     console.log(img);
    FR.readAsBinaryString(Eeviepom)
    // FR.readAsDataURL(img)
      console.log(FR.result)
      console.log({Eeviepom })
      FR.onload = function()
  {
     alert(FR.result);
     console.log(FR.result);
  };
  
    
    }
    return (
      <View>
        <Text> MobileNet  Test Screen</Text>
        <input type ="file" onChange={onFileChange}></input>
    
      </View>
    );
  };

export default MobilenetScreen;