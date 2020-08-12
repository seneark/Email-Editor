import React, { Component } from "react";
import {
	StyleSheet,
	Text,
	View,
	Image,
	Dimensions,
	TouchableOpacity,
	ScrollView,
} from "react-native";
const uri = `http://192.168.1.4:5000/`;
import * as _ from "underscore";
import { Actions } from "react-native-router-flux";
import { Button } from "react-native-paper";
import Carousel from "react-native-snap-carousel";
import { scrollInterpolator, animatedStyles } from "../utils/animation";
import img2 from "../assets/2.png";
import img3 from "../assets/3.png";
import img4 from "../assets/4.png";
import img1 from "../assets/FirstScreen.png";
import axios from "axios";

const SLIDER_WIDTH = Dimensions.get("window").width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.9);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 1.5);

const DATA = [img1, img2, img3, img4];

class Home extends Component {
	constructor(props) {
		super(props);
		this.handleImport = this.handleImport.bind(this);
		this._renderItem = this._renderItem.bind(this);
		this.state = {
			index: 0,
		};
		this.handleImport = _.debounce(this.handleImport, 800);
	}

	componentDidMount() {
		this.handleImport();
		// this.timer = setInterval(()=> this.getMovies(), 1000)
	}

	handleImport() {
		axios
			.get(uri + "api/import/")
			.then((response) => {
				console.log(response.data.name);
			})
			.catch((error) => console.log(error));
	}

	_renderItem({ item }) {
		return (
			<View style={styles.itemContainer}>
				<Image style={styles.itemLabel} source={item} />
			</View>
		);
	}

	render() {
		return (
			<ScrollView>
				<View style={styles.container}>
					<View style={styles.Heading}>
						<Text />
						<Text />
						<Text />
						<Text />
						<Text
							style={{
								textAlign: "center",
								fontWeight: "bold",
								fontSize: 20,
								letterSpacing: 4,
								color: "#201f21",
							}}
						>
							Email Editor
						</Text>
					</View>
					<Carousel
						ref={(c) => (this.carousel = c)}
						data={DATA}
						renderItem={this._renderItem}
						sliderWidth={SLIDER_WIDTH}
						itemWidth={ITEM_WIDTH}
						containerCustomStyle={styles.carouselContainer}
						inactiveSlideShift={0}
						scrollInterpolator={scrollInterpolator}
						slideInterpolatedStyle={animatedStyles}
						useScrollView={true}
					/>
					<TouchableOpacity
						onPress={Actions.Editor}
						style={styles.Button}
					>
						<Text
							style={{
								paddingBottom: 3,
								textAlign: "center",
								fontWeight: "bold",
								letterSpacing: 1,
							}}
						>
							Go to Editor
						</Text>
					</TouchableOpacity>
					<Text />
					<TouchableOpacity
						onPress={Actions.Draft}
						style={styles.Button}
					>
						<Text
							style={{
								paddingBottom: 3,
								textAlign: "center",
								fontWeight: "bold",
								letterSpacing: 1,
							}}
						>
							Go to Draft
						</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#fff",
		alignItems: "center",
	},
	Heading: {
		zIndex: -1,
		width: "100%",
		backgroundColor: "#3c9d9b",
		paddingBottom: 50,
	},
	Button: {
		borderWidth: 0.1,
		width: "90%",
		marginTop: -17,
		backgroundColor: "#3c9d9b",
		borderRadius: 5,
		height: 40,
		justifyContent: "center",
	},
	carouselContainer: {
		flex: 1,
		position: "relative",
    top: -30,    
    height: ITEM_HEIGHT,
	},
	itemContainer: {
    flex:1,
		alignItems: "center",
		justifyContent: "center",
    backgroundColor: "#f3fff8",
    
	},
	itemLabel: {
    height:"120%",
    width: "100%",
    resizeMode:'cover'
	},
	counter: {
		marginTop: 25,
		fontSize: 30,
		fontWeight: "bold",
		textAlign: "center",
	},
});

export default Home;
