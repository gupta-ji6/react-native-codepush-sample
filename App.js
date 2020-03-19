import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

import CodePush from "react-native-code-push";

class App extends Component {
  constructor() {
    super();
    this.state = { syncMessage: "" };
  }

  componentDidMount() {
    this.sync();
  }

  codePushStatusDidChange(syncStatus) {
    console.log(syncStatus);
    switch (syncStatus) {
      case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
        this.setState({ syncMessage: "Checking for update." });
        break;

      case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
        this.setState({ syncMessage: "Downloading package." });
        break;

      case CodePush.SyncStatus.AWAITING_USER_ACTION:
        this.setState({ syncMessage: "Awaiting user action." });
        break;

      case CodePush.SyncStatus.INSTALLING_UPDATE:
        this.setState({ syncMessage: "Installing update." });
        break;

      case CodePush.SyncStatus.UP_TO_DATE:
        this.setState({ syncMessage: "App is updated." });
        break;

      case CodePush.SyncStatus.UPDATE_IGNORED:
        this.setState({
          syncMessage: "Update cancelled by user.",
          progress: false
        });
        break;

      case CodePush.SyncStatus.UPDATE_INSTALLED:
        this.setState({
          syncMessage: "Update installed and will be applied on restart.",
          progress: false
        });
        break;

      case CodePush.SyncStatus.UNKNOWN_ERROR:
        this.setState({
          syncMessage: "An unknown error occurred.",

          progress: false
        });

        break;
    }
  } /** Update pops a confirmation dialog, and then immediately reboots the app */

  async sync() {
    CodePush.sync(
      { installMode: CodePush.InstallMode.IMMEDIATE, updateDialog: true },

      this.codePushStatusDidChange()
    );

    CodePush.allowRestart();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>CodePush is added ^_^</Text>
        <Text>Hello world </Text>
        <Text style={styles.messages}>{this.state.syncMessage}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    paddingTop: 50
  },

  messages: {
    marginTop: 30,
    textAlign: "center"
  },

  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 20
  }
});

/**
 * Configured with a MANUAL check frequency for easy testing. For production apps, it is recommended to configure a
 * different check frequency, such as ON_APP_START, for a 'hands-off' approach where CodePush.sync() does not
 * need to be explicitly called. All options of CodePush.sync() are also available in this decorator.
 */

let codePushOptions = { checkFrequency: CodePush.CheckFrequency.MANUAL };
App = CodePush(codePushOptions)(App);

export default App;
