import { StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import React from 'react';
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');


const BarCard = props => {
    const {
        children,
        bgColor = 'transparent',
        // height = 60,
        disabled = false,
        onPress,
        padding = 0,
        width = SCREEN_WIDTH * 0.8,

    } = props;

    const styles = StyleSheet.create({
        Barcard: {
            // width: SCREEN_WIDTH * 0.8,
            width: width,
            // height: height,
            backgroundColor: bgColor,
            alignItems: 'center',
            // justifyContent:"center",
            borderRadius: 10,
            flexWrap: "wrap",
            padding: padding,
            marginVertical: 5


        },
    });
    return (
        <TouchableOpacity onPress={onPress} style={[styles.Barcard]} disabled={disabled}>
            {children}
        </TouchableOpacity>
    );
}

export default BarCard;
