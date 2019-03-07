/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  WebView,
  Dimensions
} from "react-native";

const baseUrl = "http://192.168.1.24:5000";

const deviceWidth = Dimensions.get("window").width;

export default class App extends Component {
  state = {
    forward: false,
    backward: false,
    left: false,
    right: false
  };
  go = direction => {
    console.log(`Going...`);
    this.setState({});
    fetch(`${baseUrl}/${direction}`).then(() => {});
  };

  stop = () => {
    console.log(`Stopping...`);
    fetch(`${baseUrl}/stop`).then(() => {});
  };
  render() {
    return (
      <View style={styles.container}>
        <WebView
          source={{ uri: "http://192.168.1.24:8082" }}
          style={{ width: deviceWidth }}
        />
        <View style={styles.subContainer}>
          <View style={styles.row}>
            <TouchableWithoutFeedback
              onPressIn={() => {
                this.go("forward");
              }}
              onPressOut={this.stop}
            >
              <Text style={styles.button}>Forward</Text>
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.row}>
            <TouchableWithoutFeedback
              onPressIn={() => {
                this.go("left");
              }}
              onPressOut={this.stop}
            >
              <Text style={styles.button}>Left</Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={this.stop}>
              <Text style={styles.button}>Stop</Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPressIn={() => {
                this.go("right");
              }}
              onPressOut={this.stop}
            >
              <Text style={styles.button}>Right</Text>
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.row}>
            <TouchableWithoutFeedback
              onPressIn={() => {
                this.go("backward");
              }}
              onPressOut={this.stop}
            >
              <Text style={styles.button}>Backward</Text>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000"
  },
  subContainer: {
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center"
  },
  subContainerPressed: {
    backgroundColor: "#000"
  },
  row: {
    flexDirection: "row"
  },
  button: {
    width: 100,
    height: 100,
    backgroundColor: "grey",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    textAlignVertical: "center",
    margin: 15
  }
});
