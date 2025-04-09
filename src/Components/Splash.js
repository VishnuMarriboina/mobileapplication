import { View, Text, StyleSheet, StatusBar } from 'react-native';
import React from 'react';
import { SvgUri } from 'react-native-svg';
import { BRANDCOLOR } from '../Utils/Colors';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../Utils/Dimensions';

const CIRCLE_SIZE = 270;

const Splash = () => {

    return (
        <>
            <StatusBar backgroundColor={BRANDCOLOR} barStyle="light-content" />
            <View style={styles.container}>
                <View style={styles.circle}>
                    <SvgUri
                        uri={'https://d3b1cj4ht2fm8t.cloudfront.net/staging/Driver+App/vertical_logo+1.svg'}
                        width={200}
                        height={200}
                    />
                </View>

                <Text style={styles.textFont}>Driver</Text>


            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        height: SCREEN_HEIGHT,
        width: SCREEN_WIDTH,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: BRANDCOLOR,
    },
    circle: {
        width: CIRCLE_SIZE,
        height: CIRCLE_SIZE,
        borderRadius: CIRCLE_SIZE / 2,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textFont: {
        fontSize: 34,
        textAlign: 'center',
        position: 'absolute',
        bottom: SCREEN_HEIGHT / 6,
        paddingHorizontal: 20,
        fontWeight: '900',
        lineHeight: 30,
        letterSpacing: 0.75,
        color: 'white',
    },
});

export default Splash;

