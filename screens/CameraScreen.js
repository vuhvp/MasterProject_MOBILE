import { Camera, CameraType } from 'expo-camera';
import { Image } from 'expo-image';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function CameraScreen() {
  const [type, setType] = useState(CameraType.front);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [camera, setCamera] = useState(null);
  const [imageUri, setImageUri] = useState(null);

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant permission" />
      </View>
    );
  }

  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  async function takePicture() {
    if (camera) {
      const data = await camera.takePictureAsync(null);
      console.log(data.uri);
      setImageUri(data.uri);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        <Camera ref={(ref) => setCamera(ref)} style={styles.camera} type={type} />
      </View>
      <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={takePicture}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
        </View>
      {
        imageUri && <Image
        style={styles.image}
        source={imageUri}
        contentFit="cover"
        transition={1000}
      />
      }
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
    },
    cameraContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    camera: {
      width: 300,
      height: 300
    },
    buttonContainer: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: 'transparent',
      margin: 64,
    },
    button: {
      flex: 1,
      alignSelf: 'flex-end',
      alignItems: 'center',
    },
    text: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'white',
    },
    image: {
      flex: 1,
      width: '100%',
      backgroundColor: '#0553',
    },
});