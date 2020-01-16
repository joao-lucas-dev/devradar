import React, { useState, useEffect } from 'react';
import { View, Image, Text } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';

import styles from './styles';

export default function Main({ navigation }) {
  const [currentRegion, setCurrentRegion] = useState(null);

  useEffect(() => {
    async function loadinitialPosition() {
      const { granted } = await requestPermissionsAsync();

      if (granted) {
        const { coords } = await getCurrentPositionAsync({
          enableHighAccuracy: true,
        });

        const { latitude, longitude } = coords;

        setCurrentRegion({
          latitude,
          longitude,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04,
        });
      }
    }

    loadinitialPosition();
  }, []);

  if (!currentRegion) {
    return null;
  }

  return (
    <MapView style={styles.map} initialRegion={currentRegion}>
      <Marker coordinate={{ latitude: currentRegion.latitude, longitude: currentRegion.longitude }}>
        <Image source={{ uri: 'https://avatars2.githubusercontent.com/u/53630706?s=460&v=4' }} style={styles.avatar} />
        
        <Callout onPress={() => navigation.navigate('Profile', { githubUsername: 'joao-lucas-dev' })}>
          <View style={styles.callout}>
            <Text style={styles.devName}>João Lucas</Text>
            <Text style={styles.devBio}>Student of Stack ReactJS, React Native and NodeJS | Computer Science Student.</Text>
            <Text style={styles.devTechs}>ReactJS, React Native and Node.js</Text>
          </View>
        </Callout>
      </Marker>
    </MapView>
  );
}
