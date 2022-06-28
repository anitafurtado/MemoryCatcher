import React, {useState} from "react";
import { Image, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

import AppButton from "../../components/AppButton";
import AppIcon from "../../components/AppIcon";
import AppPicker from "../../components/AppPicker";
import AppScreen from "../../components/AppScreen";
import AppTextInput from "../../components/AppTextInput";
import DataManager from "../../config/DataManager";


function EditMemoryInformationScreen({navigation, route}) {
  //Data Manager variables
  let data = DataManager.getInstance();
  let memory = route.params.paramMemory;
  let userID = data.getUserID();
  let categories = data.getCategoriesForUser(userID);
  let collections = data.getCollectionsForUser(userID);

 

  //Checking that all the information has been entered into the memory
  const errorCheck = () => {
    return title && description && 
    image && date && location
    && collection;
  }

  //Function for opening camera roll and retrieving an image
  let openImageLibrary = async() => {
    let requestPermissions = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if(requestPermissions.granted===false){
      alert("Please give this app access to the camera roll in your Phone Settings.")
      return;
    }
    let imagePick = await ImagePicker.launchImageLibraryAsync();
    if(imagePick.cancelled===true){
      return;
    }
    setImage({path: imagePick.uri});
  }

   //State variables
   const[title, setTitle] = useState(memory.title);
   const[description, setDescription] = useState(memory.description);
   const[image, setImage] = useState(memory.image);
   const[date, setDate] = useState(memory.date);
   const[location, setLocation] = useState(memory.location);
   const[collection, setCollection] = useState(data.getCollection(memory.collectionID));
   const[category, setCategory] = useState(data.getCategory(memory.categoryID));
  return (
    <AppScreen>
      <ScrollView>
        <AppTextInput
          placeholder="Title"
          value={title}
          onChangeText={(inputText) => setTitle(inputText)}
          style = {styles.title}
        />
        <AppTextInput
          placeholder="Description"
          value={description}
          onChangeText={(inputText) => setDescription(inputText)}
          style = {styles.description}
        />
        
        {isFinite(image) ? <Image source={image} style={styles.image} /> : <Image source={{uri: image.path}} style={styles.image} />}
        
        <TouchableOpacity onPress={openImageLibrary}>
          <AppIcon name="camera-plus" style={{alignSelf: "center"}}/>
        </TouchableOpacity>

        <AppTextInput
          placeholder="Location"
          value={location}
          onChangeText={(inputText) => setLocation(inputText)}
          style = {styles.location}
        />
        
        <AppPicker
          placeholder={"Pick a Collection"}
          iconName = {"apps"}
          data = {collections}
          displayAll = {false}
          pickedItem = {collection}
          onPickedItem = {(pickedCollection)=>{
            setCollection(pickedCollection);
          }}
          keyExtractor = {item => item.collectionID.toString()}
        />
        <AppPicker
          placeholder={"Pick a Category"}
          iconName = {"apps"}
          data = {categories}
          displayAll = {false}
          pickedItem = {category}
          onPickedItem = {(pickedCategory)=>{
            setCategory(pickedCategory);
          }}
          keyExtractor = {item => item.categoryID.toString()}
        />
        
        <AppButton 
            title= "Save"
            style = {styles.button}
            onPress = {()=>{
              if(errorCheck()){
                let newImageValue = "";
                if(isFinite(image)){
                  newImageValue = image;
                } else {
                  newImageValue = image.path;
                }
                const newMemory = {
                  title: title,
                  description: description,
                  location: location,
                  date: date,
                  categoryID: category.categoryID,
                  collectionID: collection.collectionID,
                  image: newImageValue,
                }
                data.editMemory(memory.memoryID, newMemory);
                navigation.navigate("MemoryInformation", {paramMemory:memory});
              } else {
                alert("Please fill in all required fields.")

              } 
            }}
        />
      </ScrollView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  title:{
    alignSelf: "center", 
  },
  description:{
    alignSelf: "center",
    width: "90%",
  },
  image: {
    width: 350,
    height: 250,
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 10,
    borderWidth: 1,
  },
  location:{
    alignSelf: "center",
    width: "70%",
  },
  button:{
    alignSelf: "center",
    marginTop: 20,
  }
})

export default EditMemoryInformationScreen;