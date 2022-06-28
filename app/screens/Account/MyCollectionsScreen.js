import React, {useState} from 'react';
import { FlatList, Modal, StyleSheet, TouchableOpacity, View} from 'react-native';
import AppCollectionCard from '../../components/AppCollectionCard';

import AppColors from '../../config/AppColors';
import AppButton from '../../components/AppButton';
import AppIcon from '../../components/AppIcon';
import AppScreen from '../../components/AppScreen';
import AppSearch from '../../components/AppSearch';
import AppText from '../../components/AppText';
import AppTextInput from '../../components/AppTextInput';
import DataManager from '../../config/DataManager';


function MyCollectionsScreen({navigation}) {
  //Data Manager variables
  let data = DataManager.getInstance();
  let userID = data.getUserID();
  let allCollections = data.getCollectionsForUser(userID);

  const numColumns = 2;

  
  //Function to add the Collection specified in the New Colelction modal
  const addCollection = () => {
    let curCollectionID = allCollections.length+1;
    const collection = {
      collectionID: curCollectionID,
      userID: userID,
      name: newCollectionName,
    }
    data.addCollection(collection);
  }

  //Refreshing Collections page data since it is a part of Tab Navigation
  navigation.addListener("tabPress", () => {
    allCollections = data.getCollectionsForUser(userID);
    setCollections(allCollections);
  })
  //State Variables
  const[collections, setCollections] = useState(allCollections);
  const[searchItem, setSearchItem] = useState("");
  const[visible, setVisible] = useState(false);
  const[newCollectionName, setNewCollectionName] = useState("");
  return (
    <AppScreen style = {styles.container}>
      {/* Search for a Collection */}
      <View>
        <AppSearch
          placeholder={"Search Collections"}
          value={searchItem}
          onChangeText={(input)=>{
            setSearchItem(input)
            if(input==""){
              setCollections(allCollections);
            } else{
              setCollections(allCollections.filter((collection) => collection.name.toUpperCase().includes(searchItem.toUpperCase())))
            }
          }}
        />
      </View>
      {/* Navigate to all collections */}
      <TouchableOpacity 
        onPress = {()=>{
            navigation.navigate("Memories", {
            paramHasSelectedCollection: false 
          });
        }}
      >
        <View style={styles.allCollections}>
          <AppText>All Collections</AppText>
        </View>
      </TouchableOpacity>
      
      {/* Collection tiles */}
      <FlatList
        data = {collections}
        keyExtractor = {collection => collection.collectionID.toString()}
        renderItem = {({item}) =>
          <AppCollectionCard
            name = {item.name}
            onPress = {()=>{
                navigation.navigate("Memories", {
                paramHasSelectedCollection: true, 
                paramCollection:item.collectionID,
              });
            }}
          />
        
        }
        numColumns = {numColumns}
        columnWrapperStyle = {styles.collectionTiles}
      />

      {/* Add a Collection */}
      <TouchableOpacity onPress={() => setVisible(true)}>
        <View style = {styles.plusIcon} >
          <AppIcon
            name = "plus-circle"
          />
        </View>
      </TouchableOpacity>

      {/* Modal to add Collection */}
      <Modal
        animationType="slide"
        visible={visible}
      >
        <AppScreen>
          <AppButton
            title="Close"
            onPress={() => setVisible(false)}
          />
          <View style = {styles.modalContent}>
            <AppText style = {{fontSize: 30, textAlign: "center"}}>Create New Collection</AppText>
            <View style = {styles.modalInput}>
              <AppText style = {{alignSelf: "center", marginLeft: 10}}>Name:</AppText>
              <AppTextInput
                value={newCollectionName}
                onChangeText={(inputText) => setNewCollectionName(inputText)}
              />
              
            </View>
            <AppButton
            title="Save"
            onPress = {() => {
              if(data.getCollectionByName(newCollectionName)!=null){
                alert("This Collection already exists! Please try again.");
              } else if(newCollectionName =="") {
                alert("Please enter in a Collection Name!");

              } else {
                addCollection();
                setVisible(false);
                
                allCollections = data.getCollectionsForUser(userID);
                setCollections(allCollections);
                setNewCollectionName("");
              }
            }}
            />
          </View> 
        </AppScreen>
      </Modal>  
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  allCollections:{
    alignSelf: "center",
    backgroundColor: AppColors.secondaryVariantColor,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 30,
    paddingRight: 30,
    margin: 10,
    borderRadius: 45,
    borderWidth: 3,
  },
  collectionTiles:{
    justifyContent: "space-around",
    margin: 10,
  },
  plusIcon:{
    alignItems: "center",
    marginBottom: 10,
  },
  modalContent:{
    alignItems: "center",
    marginTop: 40,
  },
  modalInput:{
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 10,
    
  }
})

export default MyCollectionsScreen;