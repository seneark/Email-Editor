import React from "react";
import {
	StyleSheet,
	Text,
	View,
	Image,
	Dimensions,
	TouchableOpacity,
	ScrollView,
} from "react-native";

const SLIDER_WIDTH = Dimensions.get("window").width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.9);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 1.35);

export default function CarouselSlide({ item }) {
	return (
		<View>
			<View
				style={{
					flex: 1,
				}}
			>
            <Text>fad</Text>
				<Image style={{ width: ITEM_WIDTH, height: ITEM_HEIGHT }} source={item.fullpath}/>
			</View>
		</View>
	);
}
