import React from 'react';
import {
  StyleSheet,
  View,
  Modal,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import {BRANDCOLOR} from '../Utils/Colors';

const {width, height} = Dimensions.get('window');

export default function Skelton(props) {
  const {loading} = props;

  const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

  return (
    <Modal
      animationType="fade"
      visible={loading}
      transparent
      style={{zIndex: 9999}}
      presentationStyle="overFullScreen">
      <View style={styles.viewWrapper}>
        {/* <ActivityIndicator
          color="green"
          size="large"
          style={{marginBottom: 20}}
        /> */}

        {/* First small rectangle */}
        <ShimmerPlaceholder
          style={[styles.rectangle, {height: height * 0.15}]}
          shimmerColors={['#e0e0e0', 'rgba(37, 120, 109, 0.5)', '#e0e0e0']}
        />

        {/* Second small rectangle */}
        <ShimmerPlaceholder
          style={[styles.rectangle, {height: height * 0.2, marginTop: 20}]}
          shimmerColors={['#e0e0e0', 'rgba(37, 120, 109, 0.5)', '#e0e0e0']}
        />

        {/* Large rectangle */}
        <ShimmerPlaceholder
          style={[styles.rectangle, {height: height * 0.45, marginTop: 20}]}
          shimmerColors={['#e0e0e0', 'rgba(37, 120, 109, 0.5)', '#e0e0e0']}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  viewWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    // backgroundColor: 'rgba(37, 120, 109, 0.5)'
    backgroundColor:"white"
  },
  rectangle: {
    width: '80%',
    borderRadius: 10,
    // backgroundColor:BRANDCOLOR
  },
});
