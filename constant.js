import React, { Component } from 'react';
import { Platform, Dimensions } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('screen').width;
const SCREEN_HEIGHT = Dimensions.get('screen').height;
const WINDOW_WIDTH = Dimensions.get("window").width;
const WINDOW_HEIGHT = Dimensions.get("window").height;

const dimensions = {
	SCREEN_WIDTH,
	SCREEN_HEIGHT,
	WINDOW_WIDTH,
	WINDOW_HEIGHT,
}
const colors = {
	// varname : 'hexcolor',

	RedColor: '#E8004E',
	BlueColor: '#0098EA',
	GreenColor: '#42D100',

	Black: '#3A3C43',
	White: '#fff',
	Gray: '#74757A',
	LightGray: '#EBEBEC',
	BorderColor: '#C2C3C5',

};

export { colors, dimensions} ;