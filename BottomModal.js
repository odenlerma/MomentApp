import React, { Component } from 'react';
import { View, SafeAreaView, StatusBar, StyleSheet, Platform, ViewPropTypes, Dimensions, ActivityIndicator} from 'react-native';
import Modal from "react-native-modal";


const WINDOW_WIDTH = Dimensions.get("window").width;
const WINDOW_HEIGHT = Dimensions.get("window").height;
const isIphoneX =
  Platform.OS == "ios" && (WINDOW_WIDTH == 812 || WINDOW_HEIGHT == 812);

function noop() {}

class BottomModal extends React.PureComponent {
	state = {
		isVisible: this.props.isVisible,
		isLoading: this.props.isLoading,
	}


	componentDidMount(){
		console.log('modal mount');
	}

	componentWillUnmount(){
      	console.log('modal unmount');
    }

	render(){
		return (
			<Modal style={{justifyContent: 'flex-end', margin: 0}} isVisible={this.state.isVisible} {...this.props}>
				 <View style={styles.modalView}>
				 {this.state.isLoading == true ? 
				 	<View style={{justifyContent: 'center', flex: 1}}><ActivityIndicator size="large" /></View>
				 	:
				 	<View>
						{this.props.renderContent}
				 	</View>
				 }
				 </View>
			</Modal>
		);
	}
}

/*
BottomModal.propTypes = {
  isVisible: PropTypes.bool,
  style: ViewPropTypes.style,
  isLoading: PropTypes.bool,
}

BottomModal.defaultProps = {
  isVisible: false,
  style: {},
  isLoading: false,

}*/


const styles = StyleSheet.create({
  modalView : {
  	maxHeight: Dimensions.get('screen').height, 
  	borderTopLeftRadius: 5,
  	borderTopRightRadius: 5, 
  	paddingBottom: Platform.OS === 'ios' ? isIphoneX == true ? 34 : 0 : 20, 
  	paddingTop: Platform.OS === 'ios' ? isIphoneX == true ? 30 : 22 : 22, 
  	paddingHorizontal: 20,
  	minHeight: 200,
  	backgroundColor: '#fff',
  },
});
export { BottomModal };

//export default BottomModal;