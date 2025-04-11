import React from 'react';
import {
    StyleSheet,
    View,
    Modal,
    ActivityIndicator,
    Image,
    Dimensions,
    Text,
} from 'react-native';
export default function Loading(props) {
    const { loading } = props;
    return (
        <Modal
            animationType="fade"
            visible={loading}
            transparent
            style={{ zIndex: 9999 }}
            presentationStyle="overFullScreen">
            <View style={styles.viewWrapper}>
                <ActivityIndicator
                    color={'green'}
                    size={'large'}
                    style={{ marginTop: 12 }}
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
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
});
