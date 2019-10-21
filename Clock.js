import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, TouchableOpacity, TouchableNativeFeedback, SafeAreaView, FlatList} from 'react-native';
import moment from 'moment-timezone';
import PickerComponent from './Picker';
import { colors, dimensions } from './constant';

import ReactTimeout from 'react-timeout'


const Touchable = Platform.OS == 'ios' ? TouchableOpacity : TouchableNativeFeedback;
var timer;
var unmount = false;
class Clock extends Component {
	state = {
		//clock
    	time: moment().tz(this.props.selected_tz_clock).format("LTS"),
    	date: moment().format("LL"),
    	miliseconds: 1000,
    	//selected_tz_clock: moment.tz.guess(),
    	selected_tz_clock: this.props.selected_tz_clock,
    	selected_format: 0,
    	clock_format: 'LTS',
    	tz: this.props.tz,
      }

	async componentDidMount(){
	    //var initial_tz = moment.tz.guess();
      //console.log('clock main mount');
      unmount = false;
	    var initial_tz = this.props.selected_tz_clock;
	    await this.getMiliseconds(initial_tz);
	    this.clockTick(initial_tz);

  	}

	  getMiliseconds = async(initial_tz) =>{
	    var full_date = moment().tz(initial_tz).format('YYYY-MM-DD HH:mm:ss.SSS');
	    var new_date = new Date(full_date);
	    var get_miliseconds = new_date.getMilliseconds();
	    this.setState({miliseconds: 1000 - parseInt(get_miliseconds)});
	  }

	  componentWillUnmount(){
      //clearInterval(timer);
      unmount = true;
     // console.log('clock main unmoun');
      
	  }

   

	  clockTick(tz_clock){
      //console.log(tz_clock);
      if(unmount === false){
  	    timer = setTimeout(() => {
  	    	this.setState({
              time: moment().tz(tz_clock).format(this.state.clock_format),
              date: moment().tz(tz_clock).format("LL"),
              miliseconds: 1000,
          }, () => this.clockTick(tz_clock))
  	    },this.state.miliseconds);
      }
	   
	  }
/*
    clockTick(tz_clock){
      //if(unmount === false){
        this.props.setTimeout(this.clockSetState(tz_clock), this.state.miliseconds);
      //}
     
    }

    clockSetState = (tz_clock) => {
      this.setState({
              time: moment().tz(tz_clock).format(this.state.clock_format),
              date: moment().tz(tz_clock).format("LL"),
              miliseconds: 1000,
      }, () => this.clockTick(tz_clock))
    }
*/
	  handleTimezoneChange = async(e) => {
      //console.log(e);
      clearInterval(timer);
	    var format = this.state.selected_format === 0 ? "LTS" : "HH:mm:ss";
	    this.setState({selected_tz_clock: e});
	    await this.getMiliseconds(e);
	    this.clockTick(e, format);
	  }

	  handleChangeFormat = (e) => {
	    var format = e === 0 ? "LTS" : "HH:mm:ss";
	    this.setState({selected_format: e, clock_format: format});
	  }

	render(){
	 const { time, date, selected_tz_clock, tz, selected_format } = this.state; 
     return(
       <View style={styles.cardstyle}>
         <Text style={styles.texttime}>{time}</Text>
         <Text style={styles.textdate}>{date}</Text>
         <View style={{paddingVertical: 20, alignItems: 'center', width: '100%'}}>
              <Text style={styles.textweight}>Timezone</Text>
              <PickerComponent disabled={true} placeholder='Select a timezone' selected_item={selected_tz_clock} array={tz} pickerresult={(e)=>{this.handleTimezoneChange(e)}}/>
         </View>
         <View style={{alignItems: 'center', width: '100%'}}>
               <Text style={styles.textweight}>Time Format</Text>
               <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', width: '40%', alignSelf: 'center', paddingTop: 10}}>
                     <Touchable onPress={()=>{this.handleChangeFormat(0)}} style={selected_format === 0 ? styles.active : styles.inactive}><Text style={selected_format === 0 ? styles.activetext : styles.inactivetext}>12hr</Text></Touchable>
                     <Touchable onPress={()=>{this.handleChangeFormat(1)}} style={selected_format === 1 ? styles.active : styles.inactive}><Text style={selected_format === 1 ? styles.activetext : styles.inactivetext}>24hr</Text></Touchable>
               </View>
         </View>
       </View>
     )
	}

}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginHorizontal: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  textstyles: {
    fontSize: 20,
    color: colors.Black,
  },
  cardstyle:{
    borderWidth: 1,
    borderColor: colors.Gray,
    borderRadius: 8,
    padding: 15,
    marginVertical: 5,
    width: '100%',
  },
  headertextstyles:{
    fontSize: 24,
    fontWeight: '500',
    color: colors.Black,
  },
  buttonstyles:{
    marginVertical: 20,
    alignSelf: 'center',
    backgroundColor: colors.Black,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center'
  },
  buttontextstyles:{
    fontSize: 18,
    fontWeight: '500',
    color: colors.White,
  },
  textweight: {
    fontWeight: '600',
    color: colors.Gray
  },
  inputstyles: {
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.LightGray,
    padding: 10
  },
  segmenttext: {
    fontSize: 20,
    fontWeight: '500',
    color: colors.White,
  },
  texttime: {
    fontSize: 45,
    fontWeight: '500',
    color: colors.Black,
    alignSelf: 'center'
  },
  textdate: {
    fontSize: 20,
    fontWeight: '500',
    color: colors.Gray,
    alignSelf: 'center'
  },
  active: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: colors.Black,
    alignItems: 'center',
    justifyContent: 'center'
  },
  inactive: {
    height: 50,
    width: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: colors.Black,
    alignItems: 'center',
    justifyContent: 'center'
  },
  activetext: {
    fontSize: 18,
    fontWeight: '500',
    color: colors.White,
  },
  inactivetext: {
    fontSize: 18,
    fontWeight: '500',
    color: colors.Black,
  }
});

//export default ReactTimeout(Clock)
export default Clock

