import React, {useState} from 'react';
import {Menu} from 'react-native-paper';


function AppMenu({children}) {
  const[menuVisible, setMenuVisible] = useState(false);
  
  return (
    <>
      <Menu
        visible={menuVisible}
        onDismiss={()=>setMenuVisible(false)}
      >
        <Menu.Item title="Add Memory to Collection"/>
        <Menu.Item title="Add new Memory"/>
      </Menu>
    </>
    
  );
}
export default AppMenu;