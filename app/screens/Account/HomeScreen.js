import React, {useState} from "react";
import { Image, StyleSheet, TouchableOpacity, View} from "react-native";

import AppButton from "../../components/AppButton";
import AppColors from "../../config/AppColors";
import AppScreen from "../../components/AppScreen";
import AppText from "../../components/AppText";
import DataManager from "../../config/DataManager";

function HomeScreen({ navigation }) {
  //Data Manager variables
  let data = DataManager.getInstance();
  let user = data.getCurUser();
  
  //State variables
  const[fName, setFName] = useState(user.firstName);

  return (
    <AppScreen style={styles.container}>
      <View>        
        <View style={styles.header}>
          <Image 
            source={require("../../assets/ImageVersion.png")}
            style={styles.logo}
          /> 
          <AppButton title="Logout" onPress ={() => (navigation.navigate("Welcome"))} style={styles.logout}/>
        </View>
        
        <AppText style={styles.welcomeText}>Welcome {fName}!</AppText>

        <TouchableOpacity style={styles.collectionTile} onPress ={() => (navigation.navigate("MyCollectionsNav"))}>
            <AppText style={styles.collectionText}>My Collections</AppText>
        </TouchableOpacity>
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  header:{
    flexDirection: "row",
    justifyContent: "space-between",
  },
  logo:{
    width: 80,
    height: 80,
    borderRadius: 45,
    marginLeft: 10,
    marginTop: 5,
  },
  logout:{
    marginTop: 10,
  },
  welcomeText:{
    fontSize: 30,
    textAlign: "center",
  },
  collectionTile:{
    alignItems: "center",
  },
  collectionText:{
    textAlign: "center",
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 60,
    paddingRight: 60,
    borderWidth: 1,
    fontSize: 20,
    marginTop: 20,
    backgroundColor: AppColors.secondaryColor,

  }

});

export default HomeScreen;
