import React, { FunctionComponent, useState } from "react";
import { Modal, View, Button, Text, Image } from "react-native";
import { Images } from "../../../assets";

export const NotificationModal: FunctionComponent = (): JSX.Element => {
  const [showModal, setShowModal] = useState<boolean>(true);

  return (
    <Modal transparent visible={showModal}>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <View
          style={{
            padding: 10,
            backgroundColor: "#23396F",
            borderRadius: 6,
          }}
        >
          <View
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 10,
            }}
          >
            <Image source={Images.camera} style={{ width: 60, height: 60 }} />
          </View>
          <Text
            style={{
              fontSize: 18,
              color: "red",
              textAlign: "center",
              marginBottom: 10,
            }}
          >
            Hay una camara defectuosa
          </Text>
          <Button title="Aceptar" onPress={() => setShowModal(false)} />
        </View>
      </View>
    </Modal>
  );
};
