import { CameraView, useCameraPermissions } from 'expo-camera';
import {
  Box,
  Button,
  Heading,
  HStack,
  Modal,
  NativeBaseProvider,
} from 'native-base';
import { useState } from 'react';
import {SafeAreaView, useWindowDimensions, View} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  const [showModal, setShowModal] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    return <View />;
  }

  return (
    <SafeAreaProvider>
      <NativeBaseProvider>
        <SafeAreaView style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <Box
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Heading color={'white'}>Hello</Heading>

            <HStack
              space="4"
              justifyContent="center"
              alignItems="center"
            >
              <Button
                onPress={() => {
                  setShowModal(true);
                }}
              >
                Open Modal
              </Button>
            </HStack>
          </Box>
          <ModalMy
            setShowModal={setShowModal}
            showModal={showModal}
          >
            <CameraView
              facing="back"
              barcodeScannerSettings={{
                barcodeTypes: ['qr'],
              }}
              style={{
                flex: 1,
                alignSelf: 'center',
                aspectRatio: 1,
                marginTop: '5%'
              }}
            ></CameraView>
          </ModalMy>
        </SafeAreaView>
      </NativeBaseProvider>
    </SafeAreaProvider>
  );
}

const ModalMy = ({ children, showModal, setShowModal }) => {
    const {height} = useWindowDimensions()
  return (
    <Modal
      p={5}
      isOpen={showModal}
      onClose={setShowModal}
      size={'full'}
    >
      <Modal.Content>
        <Modal.CloseButton onPress={() => setShowModal(false)} />
        <Modal.Header>Test Modal</Modal.Header>
        <Modal.Body maxHeight={((height/1.3))*.5} height={'xs'}>{children}</Modal.Body>
      </Modal.Content>
    </Modal>
  );
};
