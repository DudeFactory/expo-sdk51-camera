import { CameraView, useCameraPermissions } from "expo-camera";
import { useState } from "react";
import {
  NativeBaseProvider as NBGUIProvider,
  View,
  Button,
  Modal,
  Box,
  Heading,
  HStack,
} from "@gluestack-ui/themed-native-base";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SafeAreaView, StyleSheet } from "react-native";

export default function App() {
  const [showModal, setShowModal] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    return <View />;
  }

  return (
    <SafeAreaProvider>
      <NBGUIProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <Box
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Heading color={"white"}>Hello</Heading>

            <HStack space="4" justifyContent="center" alignItems="center">
              <Button
                onPress={() => {
                  setShowModal(true);
                }}
              >
                Open Modal
              </Button>
            </HStack>
          </Box>
          <ModalMy setShowModal={setShowModal} showModal={showModal}>
            <CameraView
              facing="back"
              ratio="1:1"
              barcodeScannerSettings={{
                barcodeTypes: ["qr"],
              }}
              style={{ aspectRatio: 1 }}
            ></CameraView>
          </ModalMy>
        </SafeAreaView>
      </NBGUIProvider>
    </SafeAreaProvider>
  );
}

const ModalMy = ({ children, showModal, setShowModal }) => {
  return (
    <Modal p={15} isOpen={showModal} onClose={setShowModal} size={"full"}>
      <Modal.Content>
        <Modal.CloseButton onPress={() => setShowModal(false)} />
        <Modal.Header>Test Modal</Modal.Header>
        <Modal.Body display={"flex"} height={"xs"}>
          {children}
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};
