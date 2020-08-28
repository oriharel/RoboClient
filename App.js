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
  Dimensions,
  Button,
  TextInput
} from "react-native";
import Modal from "react-native-modal";
import { WebView } from "react-native-webview";

const baseUrl = "http://192.168.1.24:5000";

const deviceWidth = Dimensions.get("window").width;

export default class App extends Component {
  state = {
    forward: false,
    backward: false,
    left: false,
    right: false,
    textModalShow: false,
    textToSend: "",
    camAngle: 75
  };
  go = direction => {
    console.log(`Going...`);
    this.setState({});
    fetch(`${baseUrl}/${direction}`).then(() => {});
  };

  look = direction => {
    console.log(`Looking ${direction}...`);
    const addition = direction === "up" ? 10 : -10;
    const newAngle = this.state.camAngle + addition;
    this.setState({camAngle: newAngle});
    fetch(`${baseUrl}/cameraSet/${newAngle}`).then(() => {});
  };

  lookCenter = ()=>{
    this.setState({camAngle: 75});
    fetch(`${baseUrl}/cameraSet/75`).then(() => {});
  }

  stop = () => {
    console.log(`Stopping...`);
    fetch(`${baseUrl}/stop`).then(() => {});
  };
  toggleModal = () => {
    this.setState({ textModalShow: !this.state.textModalShow });
  };

  sendText = () => {
    console.log(`send text clicked ${this.state.textToSend}`);
    // fetch(`${baseUrl}/speak?text="${this.state.textToSend}"`).then(() => {});
    fetch(`${baseUrl}/speak`, {
      method: "POST",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({text: this.state.textToSend})
    }).then((res) => {
      console.log(`res from speak: ${JSON.stringify(res)}`)
    });
    this.toggleModal();
  };
  render() {
    return (
      <View style={styles.container}>
        <WebView
          source={{ uri: "http://192.168.1.24:8082/index.html" }}
          style={{ width: deviceWidth}}
          scalesPageToFit={true}
        />
        <View style={styles.subContainer}>
          <View style={styles.row}>
            <TouchableWithoutFeedback
                onPressIn={() => {
                  this.look("up");
                }}
            >
              <Text style={styles.camButton}>Up</Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={this.lookCenter}>
              <Text style={styles.camButton}>Reset</Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
                onPressIn={() => {
                  this.look("down");
                }}
            >
              <Text style={styles.camButton}>Down</Text>
            </TouchableWithoutFeedback>
          </View>
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
        <TouchableWithoutFeedback
          onPress={() => this.setState({ textModalShow: true })}
        >
          <Text style={styles.textButton}>Text</Text>
        </TouchableWithoutFeedback>
        <Modal isVisible={this.state.textModalShow}>
          <View style={styles.textModal}>
            <Text style={styles.title}>Write Something!</Text>
            <View style={{ flex: 1 }}>
              <TextInput
                placeholder={"Here"}
                autoFocus={true}
                onChangeText={text =>
                  this.setState({ textToSend: text })
                }
              />
            </View>
            <View style={styles.buttonsRow}>
              <Button
                style={styles.textModalButton}
                title="Cancel"
                onPress={this.toggleModal}
              />
              <Button
                style={styles.textModalButton}
                title="Send"
                onPress={this.sendText}
              />
            </View>
          </View>
        </Modal>
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
    width: 70,
    height: 70,
    backgroundColor: "grey",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    textAlignVertical: "center",
    margin: 15
  },
  camButton: {
    width: 100,
    height: 30,
    backgroundColor: "grey",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    textAlignVertical: "center",
    margin: 15
  },
  textButton: {
    position: "absolute",
    height: 30,
    width: 40,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    color: "#fff",
    bottom: 20,
    right: 20,
    backgroundColor: "blue"
  },
  textModal: {
    backgroundColor: "#fff",
    flex: 1,
    padding: 10
  },
  textModalButton: {
    alignSelf: "flex-end"
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginBottom: 30
  },
  title: {
    alignSelf: "center"
  }
});
