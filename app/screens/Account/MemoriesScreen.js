import React, {useState} from 'react';
import { FlatList, Image, Modal, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

import AppButton from '../../components/AppButton';
import AppIcon from '../../components/AppIcon';
import AppMemoryCard from '../../components/AppMemoryCard';
import AppPicker from '../../components/AppPicker';
import AppScreen from '../../components/AppScreen';
import DataManager from '../../config/DataManager';
import AppTextInput from '../../components/AppTextInput';


function MemoriesScreen({navigation, route}) {
  //Data Manager variables
  let data = DataManager.getInstance();
  let userID = data.getUserID();
  let categories = data.getCategoriesForUser(userID);
  let collections = data.getCollectionsForUser(userID);
  
  //Retrieving the memories depending on whether the user has selected
  //a collection or not
  const getCorrectMemories = () => {
    if(route.params.paramHasSelectedCollection){
      return data.getMemoriesForCollection(route.params.paramCollection);
    } else {
      return data.getMemoriesForUser(userID);
    }
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

  //Function for changing date when scrolling on Date Picker
  const onChange = (event, value) => {
    setDate(value);
  };

  //Checking that all the information has been entered into the new memory
  const errorCheck = () => {
    return title && description && 
    image && date && location
    && collection;
  }

  //Clearing the Add Memory form
  const clearForm = () => {
    setTitle("");
    setDescription("");
    setImage("");
    setDate("");
    setLocation("");
    setCollection("");
    setNewCategory("");
  }
  //State Variables
  const[menuVisible, setMenuVisible] = useState(false);
  const[category, setCategory] = useState("");
  const[memories, setMemories] = useState(getCorrectMemories());
  const[title, setTitle] = useState("");
  const[description, setDescription] = useState("");
  const[image, setImage] = useState("");
  const[date, setDate] = useState(new Date());
  const[location, setLocation] = useState("");
  const[collection, setCollection] = useState("");
  const[newCategory, setNewCategory] = useState("");

  return (
    <AppScreen>
      {/* Category Picker */}
      <AppPicker
        placeholder={"Pick a Category"}
        iconName = {"apps"}
        data = {categories}
        displayAll = {true}
        pickedItem = {category}
        onPickedItem = {(pickedCategory)=>{
          if(pickedCategory==""){
            setCategory(pickedCategory);
            setMemories(getCorrectMemories());
            
          }
          else{
            setCategory(pickedCategory);
            if(route.params.paramHasSelectedCollection){
              setMemories(data.getMemoriesForCollectionAndCategory(route.params.paramCollection, pickedCategory.categoryID));
            } else {
              setMemories(data.getMemoriesForCategory(pickedCategory.categoryID));
            }
          }
        }}
        keyExtractor = {item => item.categoryID.toString()}
      />
      
      {/* Memory Tiles */}
      <FlatList
        data={memories}
        keyExtractor = {memory => memory.memoryID.toString()}
        renderItem = {({item}) =>
          <AppMemoryCard
            title = {item.title}
            category = {data.getCategory(item.categoryID).name}
            date = {item.date}
            location = {item.location}
            image = {item.image}
            onPress = {()=>{              
              navigation.navigate("MemoryInformation", {paramMemory:item});
            }}
          />
  
        }
      />

      {/* Button to Add Memory */}
      <TouchableOpacity onPress={() => setMenuVisible(true)}>
        <View style = {styles.plusIcon} >
          <AppIcon
            name = "plus-circle"
          />
        </View>
      </TouchableOpacity>
      
      {/* Modal to Add Memory */}
      <Modal
        animationType="slide"
        visible={menuVisible}
      >
        
        <AppScreen>
          <AppButton
                title="Close"
                onPress={() => setMenuVisible(false)}
          />
          <ScrollView>
            <View style = {styles.modalContent}>

              <AppTextInput
                placeholder="Title *"
                value={title}
                onChangeText={(inputText) => setTitle(inputText)}
              />

              <AppTextInput
                placeholder="Description *"
                value={description}
                onChangeText={(inputText) => setDescription(inputText)}
              />
        
              {image ? <Image source={{uri: image.path}} style={styles.image}/> : <></> }
        
              <TouchableOpacity onPress={openImageLibrary}>
                <AppIcon name="camera-plus"/>
              </TouchableOpacity>
              
              <DateTimePicker 
                value={date} 
                mode={"date"} 
                display={"spinner"} 
                style= {{width: 280, height: 200,}}
                onChange={onChange}
              />

              <AppTextInput
                placeholder="Location *"
                value={location}
                onChangeText={(inputText) => setLocation(inputText)}
              />
              
              <AppPicker
                placeholder={"Pick a Collection *"}
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
                pickedItem = {newCategory}
                onPickedItem = {(pickedCategory)=>{
                  setNewCategory(pickedCategory);
                }}
                keyExtractor = {item => item.categoryID.toString()}
              />
              
              <AppButton 
                  title= "Save"
                  onPress = {()=>{
                    if(errorCheck()){
                      let memoryID = data.getMemoriesForUser(userID).length+1;
                      let dateFormatted = date.toISOString().split("T")[0];
                      const newMemory = {
                        memoryID: memoryID,
                        title: title,
                        description: description,
                        location: location,
                        date: dateFormatted,
                        categoryID: newCategory.categoryID,
                        collectionID: collection.collectionID,
                        image: image.path,
                        userID: userID,
                      }
                      data.addMemory(newMemory);
                      clearForm();
                      setMenuVisible(false);
                    } else {
                      alert("Please fill in all required fields.")
                    }
                     
                  }}
              />
                            
            </View>
          </ScrollView>
        </AppScreen> 
      </Modal>    
    </AppScreen>
  );
}

const styles = StyleSheet.create({

  plusIcon:{
    alignItems: "center",
    marginBottom: 10,
  },
  modalContent:{
    alignItems: "center",
  },
  image: {
    width: 350,
    height: 250,
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 10,
    borderWidth: 1,
  },
})

export default MemoriesScreen;