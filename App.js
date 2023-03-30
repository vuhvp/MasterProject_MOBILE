import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CameraScreen from './screens/CameraScreen';

function HomeScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app! Van</Text>
      {/* <StatusBar style="auto" /> */}
      <Button title='Open Camera' onPress={() => navigation.navigate('Camera')} />
    </View>
    // <CameraView />
  );
}
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        // screenOptions={{
        //   headerShown: false
        // }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'Home'}}
        />
        <Stack.Screen name="Camera" component={CameraScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
