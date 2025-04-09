import React, { useState } from "react";
import { View, Button } from "react-native";
import FancyModal from "./Modal";

const CustomButton = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button title="Show Fancy Modal" onPress={() => setModalVisible(true)} />
      <FancyModal isVisible={isModalVisible} onClose={() => setModalVisible(false)} />
    </View>
  );
};

export default CustomButton;

