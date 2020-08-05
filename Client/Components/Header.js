import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    ScrollView,
    TouchableOpacity,
    FlatList,
} from "react-native";
import {Button, Header, ListItem} from "react-native-elements";
import {Actions} from "react-native-router-flux";
import {Ionicons, MaterialCommunityIcons} from "@expo/vector-icons";
import {Menu, MenuOption, MenuOptions, MenuTrigger} from "react-native-popup-menu";

const TopHeader = ({icon, title = "My Header", home = true, draftSave = false, onclickDraft}) => {
    const action = home ? Actions.Home : Actions.pop;
    icon = home ? "home" : "keyboard-backspace"
    return (
        <Header
            containerStyle={{
                backgroundColor: '#52de97',
                justifyContent: 'space-around',
            }}
            placement="left"
            leftComponent={<TouchableOpacity onPress={action}>
                <MaterialCommunityIcons name={icon} size={25}/>
            </TouchableOpacity>}
            centerComponent={{
                text: title, style: {
                    color: '#000',
                    fontSize: 15,
                    letterSpacing: 2,
                    fontStyle: "italic",
                }
            }}
            rightComponent={
                <Menu>
                    <MenuTrigger>
                        <MaterialCommunityIcons name="dots-horizontal" size={32} style={{color: "black"}}/>
                    </MenuTrigger>
                    <MenuOptions>
                        <MenuOption onSelect={() => alert(`Save`)}>
                            <Text style={{fontSize: 20, paddingVertical: 10}}>Feedback</Text>
                        </MenuOption>
                        {draftSave ? <MenuOption onSelect={onclickDraft}>
                                <Text style={{fontSize: 20, paddingVertical: 5}}>Save to Draft</Text>
                        </MenuOption> : null}
                    </MenuOptions>
                </Menu>}
        />
    );
};

export default TopHeader;
