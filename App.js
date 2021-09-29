import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

export default class WeatherScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      weather: '',
    };
  }

  getWeather = async () => {
    var url = 'https://fcc-weather-api.glitch.me/api/current?lat=35&lon=139';
    return (
      fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({
            weather: responseJson,
          });
        })
        //returning errors
        .catch((error) => {
          console.error(error);
        })
    );
  };

  componentDidMount() {
    this.getWeather();
  }

  render() {
    if (this.state.weather === '') {
      return (
        <View style={styles.container}>
          <Text>Loading....</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.subCont}>
            <Text style={styles.title}> Weather Forecast </Text>
            <Image style={styles.cloudImage} source={require('./load.png')} />
            <View style={styles.textContainer}>
            <Text>Weather : {this.state.weather.weather[0].description}</Text>
            <Text>Wind Speed : {this.state.weather.wind.speed}</Text>
            <Text>Temprature : {this.state.weather.main.temp}</Text>
            <Text>Min Temprature : {this.state.weather.main.temp_min}</Text>
            <Text>Max Temprature : {this.state.weather.main.temp_max}</Text>
            <Text>Pressure : {this.state.weather.main.pressure}</Text>
            <Text>Humidity : {this.state.weather.main.humidity}</Text>
          </View>{' '}
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    alignItems: 'center',
  },
  subCont: {
    flex: 1,
    margin:-20,
    marginBottom:28,
    borderWidth: 1,
    alignItems: 'center',
  },
  title: { marginTop: 50, fontSize: 30, fontWeight: '550' },
  cloudImage: { width: 200, height: 200, marginTop: 30, marginBottom: 20 },
  textContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
