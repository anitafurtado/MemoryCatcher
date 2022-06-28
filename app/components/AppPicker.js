import React, {useState} from 'react';
import { FlatList, Modal, StyleSheet, TouchableOpacity, View } from 'react-native';

import AppColors from '../config/AppColors';
import AppButton from './AppButton';
import AppIcon from './AppIcon';
import AppPickerItem from './AppPickerItem';
import AppScreen from './AppScreen';
import AppText from './AppText';


function AppPicker({data, iconName, placeholder, pickedItem, onPickedItem, keyExtractor, displayAll, styleContainer, styleText}) {

  const[visible, setVisible] = useState(false);
  return (
    <>
      
      <TouchableOpacity onPress={() => setVisible(true)}>
        <View style = {[styles.picker, styleContainer]}>
          <AppIcon name={iconName} size={30}/>
          <AppText style = {[styles.pickerText, styleText]}>{pickedItem ? pickedItem.name : placeholder}</AppText>
        </View>
      </TouchableOpacity>
      
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
            <AppText style = {{fontSize: 30, textAlign: "center"}}>{placeholder}</AppText>
            
            {displayAll && <AppPickerItem
                  title="All"
                  onPress={()=>{
                    onPickedItem("");
                    setVisible(false);
                    
                  }}
                />}
           
            <FlatList
              data={data}
              keyExtractor={keyExtractor}
              renderItem = {({item}) =>
                <AppPickerItem
                  title={item.name}
                  onPress={()=>{
                    onPickedItem(item);
                    setVisible(false);
                  }}
                />
        
              }
            />
          </View>
          
          
        </AppScreen>

      </Modal>
    </>
  );
}
const styles = StyleSheet.create({
  picker:{
    flexDirection: "row",
    backgroundColor: AppColors.secondaryColor,
    borderWidth: 2,
    margin: 10,
    padding: 10,
    
  },
  pickerText:{
    alignSelf: "center", 
    marginLeft: 10,
  },
})
export default AppPicker;