import React, {useState} from "react";
import { Image, Modal, StyleSheet, TouchableOpacity, View } from "react-native";

import AppButton from "../../components/AppButton";
import AppColors from "../../config/AppColors";
import AppScreen from "../../components/AppScreen";
import AppText from "../../components/AppText";
import DataManager from "../../config/DataManager";

function MemoryInformationScreen({navigation, route}) {
  //Data Manager variables
  let data = DataManager.getInstance();
  let memory = route.params.paramMemory;

  //State Variables
  const[deleteMenuVisible, setDeleteMenuVisible] = useState(false);


  return (
    <AppScreen>
      <AppText style = {styles.title}>{memory.title}</AppText>
      <AppText style = {styles.description}>{memory.description}</AppText>
      {isFinite(memory.image) ? <Image source={memory.image} style={styles.image} /> : <Image source={{uri: memory.image}} style={styles.image} />}

      <View style = {styles.dateLocation}>
        <AppText >{memory.date}</AppText>
        <AppText >{memory.location}</AppText>
      </View>
      
      <AppText style = {styles.collection}>Collection: {data.getCollection(memory.collectionID).name}</AppText>
      <AppText style = {styles.category}>Category: {data.getCategory(memory.categoryID).name}</AppText>
      <View style = {styles.buttons}>
        {/* Edit Memory */}
        <AppButton 
          title= "Edit"
          onPress = {()=>{
            navigation.navigate("EditMemoryInformation", {paramMemory:memory});
          }}
        />
        {/* Delete Memory */}
        <AppButton 
          title= "Delete"
          onPress = {()=> setDeleteMenuVisible(true)}
        />
        <Modal
          animationType="slide"
          visible={deleteMenuVisible}
        >
          <AppScreen>
            <View style={styles.modalContent}>
              <AppText style={styles.deleteText}>Are you sure you want to delete this memory?</AppText>

              <View style = {styles.allMenuOptions}>
                <TouchableOpacity onPress={() => {
                  data.removeMemory(memory.memoryID);
                  setDeleteMenuVisible(false);
                  navigation.navigate("MyCollections");
                }}>
                  <View style={styles.menuOption}>
                    <AppText>Yes</AppText>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setDeleteMenuVisible(false)}>
                  <View style={styles.menuOption}>
                    <AppText>No</AppText>
                  </View>
                </TouchableOpacity>

              </View>
            </View>
          </AppScreen>
        </Modal>
      </View>  
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  title:{
    alignSelf: "center", 
    fontSize: 35, 
    fontWeight: "bold", 
    marginTop: 10,
  },
  description:{
    alignSelf: "center"
  },
  image: {
    width: 350,
    height: 250,
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 10,
    borderWidth: 1,
  },
  dateLocation:{
    flexDirection: "row", 
    justifyContent: "space-around",
  },
  collection:{
    marginLeft: 10,
    marginTop: 30,
  },
  category:{
    marginLeft: 10,
    marginTop: 10,
  },
  buttons:{
    alignItems: "center",
    flex:1,
    flexDirection: "row",
    justifyContent: "center",    
  },
  modalContent:{
    flex:1,
    justifyContent: "center",
  },
  deleteText:{
    alignSelf: "center", 
    fontSize: 25, 
    textAlign: "center", 
    width: "70%",
  },
  allMenuOptions:{
    flexDirection: "row",
    justifyContent: "center",
  },
  menuOption:{
    padding: 15,
    backgroundColor: AppColors.secondaryColor,
    borderRadius: 20,
    borderWidth: 1,
    margin: 10,

  },
});

export default MemoryInformationScreen;
