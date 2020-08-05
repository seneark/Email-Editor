import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import List from "../Components/List";
import TopHeader from '../Components/Header'
const uri = `http://192.168.1.4:5000/`;
import data from "./data.json";
import axios from "axios";
import {Actions} from "react-native-router-flux";

class Draft extends Component {
    constructor(props){
        super(props);
        this.DeleteDraft = this.DeleteDraft.bind(this);
        this.OpenDraft = this.OpenDraft.bind(this);
        this.state = {
            data: [
                {title: "daf"},
                {title: "fdafaf", class:"gsdgs"}
            ],
          };

    }

    DeleteDraft(Id){
        axios.get(uri+"api/deleteDraft/?id="+Id)
            .then(response => {
                console.log(response.data["msg"]);
            })
            .catch(err => console.log(err));
    }

    OpenDraft(item){
        Actions.Editor({To:item.To, Subject:item.Subject,Body:item.Body});
    }

  render() {
    return (
      <ScrollView
        containerStyle={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
          <TopHeader home={false} title="Drafts"/>
        <Text/>
        <List data={data} RightElementDelete={true} RightButtonPress={(Id) => this.DeleteDraft(Id)} onClick={(item) => {this.OpenDraft(item)}} />

      </ScrollView>
    );
  }
}

export default Draft;
