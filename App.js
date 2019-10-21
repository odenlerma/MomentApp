/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, TouchableOpacity, TouchableNativeFeedback, SafeAreaView, ScrollView, FlatList} from 'react-native';
import moment from 'moment-timezone';
import PickerComponent from './Picker';
import Clock from './Clock';
import { colors, dimensions } from './constant';
import SegmentedControlTab from "react-native-segmented-control-tab";
import { styles } from './styles';
import { BottomModal } from './BottomModal';


const Touchable = Platform.OS == 'ios' ? TouchableOpacity : TouchableNativeFeedback;
var unmountClock = true;

export default class App extends Component {
  state = {
    date: null,
    selected_tz: 'America/Los_Angeles',
    tz: moment.tz.names(),
    convert_type: ['UTC', 'Local Time', 'Timezone'],
    selected_convert_type: 'Local Time',
    to_selected_convert_type: 'UTC',
    to_selected_tz: 'America/Los_Angeles',
    result: null,
    format: 'YYYY-MM-DD HH:mm:ss',
    timeago: '1 minute ago',
    result_timeago: null,
    raw_result: null,
    segmentIndex: 0,


    selected_tz_clock: 'America/Los_Angeles',
    clock_array: [
      {
        clock_id: '1',
        selected_tz_clock: 'America/Los_Angeles',
      },
      {
        clock_id: '2',
        selected_tz_clock: 'Asia/Manila',
      },
    ],
    isModal: false,
    isLoading: false,
    add_selected_tz_clock: null,
    isModalUnmount: true,


  }

  componentDidMount(){
   unmountClock = false;
   var a = moment("2019-06-03 02:25:37", "YYYY-MM-DD HH:mm:ss").subtract(90, 'days').format('YYYY-MM-DD HH:mm:ss');
   console.log(a);
   console.log('dsads');
  }



 
  convert = () => {
   const { selected_tz, selected_convert_type, to_selected_convert_type, to_selected_tz, date, format } = this.state;

   /*if(date == null || date == ''){
     alert('Input Date');
     return;
   }

   if(!moment(date, format, true).isValid()){
     alert('Invalid date format');
     return;
   }*/

   if(selected_convert_type == 'Local Time' && to_selected_convert_type == 'Local Time'){
     alert('You cannot convert local time to local time');
     return;
   }

   if(selected_convert_type == 'UTC' && to_selected_convert_type == 'UTC'){
     alert('You cannot convert UTC to UTC');
     return
   }

   if(selected_convert_type == 'Timezone' && to_selected_convert_type == 'Timezone' && selected_tz == to_selected_tz){
     alert('You cannot convert same timezones');
     return
   }

   let result;
   let raw_result;
   //local
   if(selected_convert_type == 'Local Time'){
        if(to_selected_convert_type == 'UTC'){ // local to utc
          raw_result = moment().utc().format();
          result = moment().utc().format(format);
        }else if(to_selected_convert_type == 'Timezone'){ // local to tz
          raw_result = moment().tz(to_selected_tz).format();
          result = moment().tz(to_selected_tz).format(format);
        }else{
          return;
        }
   }
   //utc
   else if(selected_convert_type == 'UTC'){
        if(to_selected_convert_type == 'Local Time'){ // utc to local
          result = moment.utc(date).local().format(format);
        }else if(to_selected_convert_type == 'Timezone'){ // utc to tz
          var currentDate = moment.utc(date).local();
          result = moment(currentDate).tz(to_selected_tz).format(format);
        }else{
          return;
        }    
   }
   //timezone
   else if(selected_convert_type == 'Timezone'){
        if(to_selected_convert_type == 'Local Time'){ // tz to local
          var cont = moment.tz(date, selected_tz);
          result = moment(cont).tz('Asia/Manila').format(format);
        }else if(to_selected_convert_type == 'Timezone'){ // tz to tz
          var cont = moment.tz(date, selected_tz);
          result = moment(cont).tz(to_selected_tz).format(format);
        }else if(to_selected_convert_type == 'UTC'){ // tz to utc
          //var cont = moment(date).tz(selected_tz);
          result = moment.tz(date, format, selected_tz).utc().format(format);;
        }else{
          return;
        }    
   }

     //alert(result);
     this.setState({result: result});

  }

  handleSegmentChange = (index) => {
    this.setState({segmentIndex: index});
  }

  converttimeago = () => {
    const { timeago, format } = this.state

    var myRegExp = /^(\d+)\+?\s(\w+)\sago$/;

    var results = myRegExp.exec(timeago);
    var num = results[1];
    var duration = results[2];

    var result = moment().subtract(num,duration).format(format);
    this.setState({result_timeago: result})
    alert(result);
  }

  addClock = async () => {
    if(this.state.add_selected_tz_clock == null || ''){
      return;
    }
    let duplicate_clock_array = this.state.clock_array;
    let new_clock_id = parseInt(this.state.clock_array.slice(-1)[0].clock_id) + 1;

    let newClockArr = [...duplicate_clock_array, {clock_id: new_clock_id.toString(), selected_tz_clock: this.state.add_selected_tz_clock }];
    this.setState({clock_array: newClockArr, isModal: false});
  }

  

  renderconvert(){
    const { date, selected_tz, tz, selected_convert_type, convert_type, to_selected_tz, to_selected_convert_type, result, timeago, result_timeago, segmentIndex } = this.state;
    return(
      <View style={styles.container}>
        <View style={styles.cardstyle}>
              <Text style={styles.textweight}>Select DateTime Type</Text>
              <PickerComponent placeholder='Select a timezone' selected_item={selected_convert_type} array={convert_type} pickerresult={(e)=>{this.setState({result: null, selected_convert_type: e})}}/>

              {selected_convert_type != 'Local Time' && (
                <View>
                  <Text style={styles.textweight}>Input Date</Text>
                  <TextInput value={date} onChangeText={ date => {this.setState({date})}} placeholder='YYYY-MM-DD HH:mm:ss' style={[styles.textstyles, styles.inputstyles]}/>
                </View>
              )}

              {selected_convert_type == 'Timezone' && (
                <View>
                  <Text style={styles.textweight}>Select Timezone</Text>
                  <PickerComponent placeholder='Select a timezone' selected_item={selected_tz} array={tz} pickerresult={(e)=>{this.setState({selected_tz: e})}}/>
                </View>
              )}
              
           </View>

           <Text style={{alignSelf: 'center'}}>to</Text>
           <View style={styles.cardstyle}>
              <Text style={styles.textweight}>Select DateTime Type</Text>
              <PickerComponent placeholder='Select a timezone' selected_item={to_selected_convert_type} array={convert_type} pickerresult={(e)=>{this.setState({result: null, to_selected_convert_type: e})}}/>
              {to_selected_convert_type == 'Timezone' && (
                  <View>
                  <Text style={styles.textweight}>Select Timezone</Text>
                  <PickerComponent placeholder='Select a timezone' selected_item={to_selected_tz} array={tz} pickerresult={(e)=>{this.setState({to_selected_tz: e})}}/>
                  </View>
              )}
           </View>

            
             <Touchable style={styles.buttonstyles} onPress={this.convert}><Text style={styles.buttontextstyles}>Convert</Text></Touchable>
             <Text style={styles.textweight}> Converted Date: </Text>
             <Text style={[styles.headertextstyles,{alignSelf: 'center'}]}>{result}</Text>
        </View>
       );
  }

  rendertimeago(){
  
    return(
        <View style={styles.container}>
          <View style={styles.cardstyle}>
               <Text style={styles.textweight}>Input Timeago</Text>
               <TextInput value={timeago} onChangeText={ timeago =>{this.setState({timeago})}} placeholder='timeago' style={styles.textstyles}/>
           </View>
           <Touchable style={styles.buttonstyles} onPress={this.converttimeago}><Text style={styles.buttontextstyles}>Convert Timeago</Text></Touchable>
           <Text style={styles.textweight}> Converted Date: </Text>
           <Text style={{alignSelf: 'center'}}>{result_timeago}</Text>
        </View>

     )
  }

  renderContent(){
    const { add_selected_tz_clock, tz } = this.state;
    return(
      <View>
        <Text style={styles.textweight}>Select timezone</Text>
        <PickerComponent placeholder='Select a timezone' selected_item={add_selected_tz_clock} array={tz} pickerresult={(e)=>{this.setState({add_selected_tz_clock: e})}}/>
        <Touchable style={styles.buttonstyles} onPress={this.addClock}><Text style={styles.buttontextstyles}>Add Timezone</Text></Touchable>
      </View>
    );
  }

  modalToggle = () => {
    //console.log(this.state.isModal);
    this.setState({isModal: !this.state.isModal, isModalUnmount: false});
    unmountClock = this.state.segmentIndex == 0 ? false : true;
  }


  render() {
    const { segmentIndex, clock_array, tz, isModal, isLoading, isModalUnmount } = this.state;
    return (
      <SafeAreaView style={styles.mainContainer}>
        
         <SegmentedControlTab values={["Clock", "Convert"]} selectedIndex={segmentIndex} onTabPress={this.handleSegmentChange} tabsContainerStyle={{paddingTop: 20}} tabStyle={{paddingVertical: 10}} tabTextStyle={{fontSize: 20}}/>
         
          {segmentIndex === 0 ? 
            (
              <View>
              <ClockFlatList clock_array={clock_array} tz={tz}/>
              <Touchable style={styles.buttonstyles} onPress={this.modalToggle}><Text style={styles.buttontextstyles}>Add Clock</Text></Touchable>
              </View>
            )
          : 
            this.renderconvert()}

         

         {isModalUnmount === false && <BottomModal isVisible={isModal} onBackdropPress={this.modalToggle} isLoading={isLoading} renderContent={this.renderContent()} onModalHide={()=>{this.setState({isModalUnmount: true})}}/>}

      </SafeAreaView>
    );
  }
}


class ClockFlatList extends React.PureComponent {
   
    state = {
      clock_array: this.props.clock_array
    }
    
    componentDidMount(){

    }

    componentWillUnmount(){

      //console.log('Flatlist unmount');
    }

    render(){
      return(
          <FlatList 
            data ={this.state.clock_array}
            extraData={this.state}
            keyExtractor={item => item.clock_id}
            renderItem={({item, index}) => 
            <Clock selected_tz_clock={item.selected_tz_clock} tz={this.props.tz}/>
          }/>
      )
     
    }
}


