import Picker from 'react-native-picker';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {Alert, TouchableOpacity, View, SafeAreaView, ViewPropTypes, Keyboard, TouchableNativeFeedback, Platform, Text} from 'react-native';
import { colors, dimensions} from './constant';

const Touchable = Platform.OS == 'ios' ? TouchableOpacity : TouchableNativeFeedback;

function noop() {}
class PickerComponent extends Component {
  state={
    selected_item: this.props.selected_item,
    array: this.props.array,
  }
  openPicker(){
    Keyboard.dismiss();
    Picker.init({
      pickerData: this.props.array,
      selectedValue: [this.props.selected_item],
      wheelFlex: [1],
      pickerFontSize: 24,
      pickerBg: [255,255,255,1],
      pickerToolBarFontSize: 20,
      pickerToolBarBg: [58,60,67,1],
      pickerConfirmBtnColor: [255,255,255,1],
      pickerCancelBtnColor: [255,255,255,1],
      pickerTitleText: '' ,
      pickerConfirmBtnText: 'Confirm',
      pickerCancelBtnText: 'Cancel',
      pickerTextEllipsisLen: 30,
      onPickerConfirm: data => {
          this.setState({selected_item: data[0]});
          setTimeout(()=>{
            this.props.pickerresult(this.state.selected_item);
          },0)
      },
      onPickerCancel: data => {
        //console.log(data);
      },
      onPickerSelect: data => {

      }
    });
    Picker.show();

  }

  render() {
    return (

       <Touchable activeOpacity={1} onPress={this.props.disabled == false && this.openPicker.bind(this)} style={{justifyContent: 'center', alignItems: 'flex-start', borderRadius: 6, borderWidth: 1, borderColor: colors.LightGray, padding:10}}>
            <Text style={{flexWrap: 'wrap', fontSize: 18, color: this.state.selected_item == null || this.state.selected_item == '' || this.state.selected_item == '<null>' || this.props.selected_item == null || this.props.selected_item == '' || this.props.selected_item == '<null>' ? colors.Gray : colors.Black}}>{(this.state.selected_item == null || this.state.selected_item == '' || this.state.selected_item == '<null>' || this.props.selected_item == null || this.props.selected_item == '' || this.props.selected_item == '<null>') ? this.props.placeholder : this.props.selected_item}</Text>
        </Touchable>
      
    );
  }
}

// {...this.props}
PickerComponent.propTypes = {
  selected_item:  PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    ]),
  placeholder: PropTypes.string,
  pickerresult: PropTypes.func,
  array: PropTypes.array,
  disabled: PropTypes.bool
};

PickerComponent.defaultProps = {
  selected_item: null,
  placeholder: 'Select',
  pickerresult: noop,
  array: [],
  disabled: false,
};

export default PickerComponent;
