import {StatusBar} from "expo-status-bar";
import React, {Component} from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Linking
} from "react-native";
import axios from "axios";
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import {Actions} from 'react-native-router-flux';
import {Button, Header, Divider} from 'react-native-elements';
const uri = `http://192.168.1.4:5000/`;
// import Constants from "expo-constants";
// const {manifest} = Constants;
// const uri = `http://${manifest.debuggerHost.split(':').shift()}:5000/`;
import * as _ from "underscore";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {MaterialCommunityIcons, AntDesign} from '@expo/vector-icons';

import TopHeader from "../Components/Header";

class Editor extends Component {
    constructor(props) {
        super(props);
        this.ChangeText = this.ChangeText.bind(this);
        this.getPrediction = this.getPrediction.bind(this);
        this.ChangeSentence = this.ChangeSentence.bind(this);
        this.saveDraft = this.saveDraft.bind(this);
        this.state = {
            To: "",
            Subject: "",
            input: "",
            caretPos: 0,
            predictions: [],
            sentPredictions: [],
            inputHeight: 40,
            isDraft: false
        };
        this.getPrediction = _.debounce(this.getPrediction, 600);
    }

    componentDidMount(){
        if(this.props.To){
            this.setState({To: this.props.To});
        }
        if(this.props.Body){
            this.setState({input: this.props.Body});
        }
        if(this.props.Subject){
            this.setState({Subject: this.props.Subject});
        }
        if(this.props.To || this.props.Body || this.props.Subject){
            this.setState({isDraft: true});
        }
    }

    getPrediction(text) {
        axios
            .post(uri + "api/predict/", {input: this.state.input, caretPos: this.state.caretPos})
            .then((response) => {
                // console.log(response.data);
                this.setState({predictions: response.data["results"].slice(0, 3)});
                this.setState({sentPredictions: response.data["sentence"].slice(0, 2)});
                // console.log(this.state.predictions);
            })
            .catch((error) => console.log(error));
        this.ChangeSentence();
    }

    ChangeText(event) {
        // console.log(this.state.input.slice(0,event.nativeEvent.selection.start));
        // console.log(event.nativeEvent.selection.start);
        this.setState({caretPos: event.nativeEvent.selection.start});

        this.getPrediction(this.state.input);

    }

    ChangeSentence(text) {
        if (text) {
            text = (text["item"]);
            let begin = 0, end = this.state.input.length;
            for (let i = this.state.caretPos - 2; i >= 0; i--) {
                begin = i;
                if (this.state.input[i] === " " || this.state.input[i] === "\n") {
                    break;
                }
            }
            for (let i = this.state.caretPos - 1; i < this.state.input.length; i++) {
                end = i;
                if (this.state.input[i] === " " || this.state.input[i] === "\n") {
                    break;
                }
            }
            // console.log(this.state.input.slice(begin+1, end+1));
            let str = (this.state.input.slice(0, this.state.caretPos));

            let pos = 0;
            if (str.match(/ /g || [])) {
                pos = (str.match(/ /g || []).length);
            }
            str = this.state.input.split(" ");
            if (str[pos + 1]) {
                str[pos] = text;
            } else {
                str[pos] = text + " ";
            }
            this.setState({input: str.join(' ')});
        }
    }

    saveDraft(){
        let obj = {
            To: this.state.To,
            Subject: this.state.Subject,
            Body: this.state.input
        }
        axios.post(uri+"api/saveDraft/", obj)
            .then(res => {
                console.log(res.data.msg);
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: "#f4f6ff",}}>
                <TopHeader title="Compose Your Email" draftSave={true} onclickDraft={this.saveDraft}/>

                <View style={styles.container}>
                    <Text/>
                    <View style={styles.textInputHead}>
                        <Text style={{
                            textAlignVertical: 'center',
                            marginRight: 10,
                        }}>To: </Text>
                        <TextInput
                            placeholder="Recipient Email Address"
                            onChangeText={(text) => this.setState({To: text})}
                            value={this.state.To}
                        />
                    </View>
                    <View
                        style={{
                            width: "95%",
                            borderBottomColor: 'black',
                            borderBottomWidth: 1,
                            opacity: 0.4
                        }}
                    />
                    <View style={styles.textInputHead}>
                        <Text style={{
                            textAlignVertical: 'center',
                            marginRight: 10,
                        }}>Sub:</Text>
                        <TextInput
                            placeholder="Enter the Subject"
                            onChangeText={(text) => this.setState({Subject: text})}
                            value={this.state.Subject}
                        />
                    </View>
                    <View
                        style={{
                            width: "95%",
                            borderBottomColor: 'black',
                            borderBottomWidth: 1,
                            opacity: 0.4
                        }}
                    />
                    <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', width: "90%"}}>
                        {this.state.predictions.map((item, idx) => {
                            return (
                                <Button key={idx} type="clear"
                                        buttonStyle={{paddingHorizontal: 20, textAlignVertical: "center", height: 35}}
                                        title={item}
                                        onPress={() => this.ChangeSentence({item})}/>
                            );
                        })}
                    </View>
                    {this.state.sentPredictions ?<View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', width: "90%"}}>
                        {this.state.sentPredictions.map((item, idx) => {
                            return (
                                <Button key={idx} type="clear"
                                        buttonStyle={{paddingHorizontal: 20, textAlignVertical: "center", height: 35}}
                                        title={item}
                                        onPress={() => this.ChangeSentence({item})}/>
                            );
                        })}
                    </View> : null}
                    
                    <View
                        style={{
                            width: "95%",
                            borderBottomColor: 'black',
                            borderBottomWidth: 1,
                            opacity: 0.4
                        }}
                    />
                        <ScrollView contentContainerStyle={{display: "flex", justifyContent: "center"}} style={{width: '97%'}}>
                            <KeyboardAwareScrollView
                                resetScrollToCoords={{x: 0, y: 0}}
                                scrollEnabled={true}
                                extraHeight={0}
                                style={styles.textInputBody}
                                enableAutomaticScroll={true}
                            >
                                <TextInput
                                    placeholder="Enter the text here"
                                    blurOnSubmit={false}
                                    onChangeText={(text) => this.setState({input: text})}
                                    value={this.state.input}
                                    multiline={true}
                                    textAlignVertical="top"
                                    scrollEnabled={true}
                                    onSelectionChange={(event) => this.ChangeText(event)}
                                />
                            </KeyboardAwareScrollView>

                            <View style={styles.Button}>
                                <TouchableOpacity
                                    style={{
                                        backgroundColor: "#52de97",
                                        paddingHorizontal: 20,
                                        paddingVertical: 8,
                                        borderRadius: 100,
                                        flexDirection: 'row'
                                    }}
                                    onPress={() => Linking.openURL(`mailto:${this.state.To}?subject=${this.state.Subject}&body=${this.state.input}`)}>
                                    <MaterialCommunityIcons name="email-variant" size={20}/>
                                    <Text> Send Email</Text>
                                </TouchableOpacity>
                            </View>

                        </ScrollView>
                </View>
            </View>
        );
    }
}

export default Editor;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
    // for other fields at top
    textInputHead: {
        width: "100%",
        padding: 3,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        borderRadius: 2,
        flexDirection: 'row',
        marginBottom: 4
    },
    // for input boxes
    textInputBody: {
        marginTop: 5,
        width: "100%",
        padding: 3,
        paddingHorizontal: 10,
        minHeight: 400,
        maxHeight: 400,
        backgroundColor: '#fff',
        borderRadius: 2,
    },
    predictions: {
        display: "flex",
        flexDirection: 'row'
    },
    Button: {
        marginTop: 10,
        alignItems: "flex-end",
        width: "96%"
    },
});
