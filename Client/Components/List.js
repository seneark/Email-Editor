import React from "react";
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
import {Entypo} from "@expo/vector-icons";
import {Actions} from "react-native-router-flux";

const ProductList = ({data, RightElementDelete=true, RightButtonPress, onClick}) => {
    const icon = RightElementDelete?"cross":"chevron-small-right"
    return (
        <View>
            {data.map((item, idx) => {
                return (
                    <TouchableOpacity key={idx} onPress={() => {onClick(item)}}>
                    <ListItem
                        title={item.Subject}
                        subtitle={item.Body.slice(0,10)}
                        bottomDivider
                        rightElement={
                            <TouchableOpacity onPress={() => {RightButtonPress(idx)}}>
                                <Entypo name={icon} size={25}/>
                            </TouchableOpacity>
                        }
                    />
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

export default ProductList;
