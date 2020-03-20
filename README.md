# react-native-codepush-sample

[![Build status](https://build.appcenter.ms/v0.1/apps/206e52db-35f0-413d-aa6c-51a1319c3ddc/branches/master/badge)](https://appcenter.ms)
![Twitter Follow](https://img.shields.io/twitter/follow/_guptaji_?label=Follow&style=social)
![GitHub followers](https://img.shields.io/github/followers/gupta-ji6?label=Follow&style=social)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/gupta-ji6/react-native-codepush-sample/issues)

A sample project to test [CodePush (now called App Center)](https://appcenter.ms) integration in React Native, which worked successfully :tada:.

## What is App Center (previously CodePush)?

[CodePush](https://appcenter.ms/) is a service by Microsoft to deliver OTA updates on React Native applications which gives mobile applications a web-like agility.

## Get Started with App Center

### Prerequisites

1. [App Center](https://appcenter.ms/) account (prefer signing in with GitHub).
2. [React Native](https://reactnative.dev/docs/getting-started) setup.

Create a React Native app using [react-native-cli](https://www.npmjs.com/package/react-native-cli) and push the code to a GitHub repo.

```lang-sh
react-native init CodePushRN    # initialize a new React Native Project
cd CodePushRN                   # switch to project directory
react-native run-android        # run app in device/simulator

# pushing code to GitHub repo (say we name it react-native-codespush-sample)

git remote add origin <GitHub repo URL>
git add .
git commit -m ":tada: Initailised React Native project"
git push origin master
```

Your app on device/simulator should look like below.

<p align="center">
<img src="https://user-images.githubusercontent.com/21218732/77157164-d4886980-6ac6-11ea-8261-ffac168de7c6.jpg" height="400" width="auto">
</p>

### Adding app in App Center

1. Login to [App Center](http://appcenter.ms/) and click on '**Add new app**' button.
1. Fill the details according to your requirements. Sample inputs -

    | Label        |    Input     |
    | ------------ | :----------: |
    | App Name     |  CodePushRN  |
    | Release Type |     Beta     |
    | OS           |   Android    |
    | Platform     | React Native |

1. Click '**Add new app**' button.
1. Add App Center SDK in your app as instructed in '**Overview**' section, if needed.
1. Go to '**Build**' section to connect you repo.
1. Select '**GitHub**' service and select your repo.
1. Select `master` branch and click on gear icon (settings) at end of item.

    - Build Variant - Release
    - Node.js version - 12.x
    - Sign Builds - On
    - Check '**My Gradle settings are...**' (**only for test purpose**)
    - Distribute Builds - On

1. Click '**Save & Build**'.
1. After successfull build, you'll recieve a mail from App Center to install the APK on device.
1. Install APK on device.

## Setup App Center CLI

```lang-sh
npm install -g appcenter-cli    # Install appcenter
appcenter login                 # Login to appcenter
```

Copy authentication code opened in browser and paste in terminal prompt.

### Create Deployment

1. Select **Distribute** > **Codepush**.
2. Click **Create standard deployments**.

### Plugin Installation (Android)

> Refer the [documentation](https://docs.microsoft.com/en-us/appcenter/distribution/codepush/react-native) for other platform guide.

#### Plugin Installation and Configuration for React Native 0.60 version and above (Android)

1. In your `android/app/build.gradle` file, add the `codepush.gradle` file as an additional build task definition underneath `react.gradle`:

    ```gradle
    ...
    apply from: "../../node_modules/react-native/react.gradle"
    apply from: "../../node_modules/react-native-code-push/android/codepush.gradle"
    ...
    ```

2. Update the `MainApplication.java` file to use CodePush via the following changes:

    ```java
    ...
    // 1. Import the plugin class.
    import com.microsoft.codepush.react.CodePush;
    public class MainApplication extends Application implements ReactApplication {
        private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
            ...
            // 2. Override the getJSBundleFile method in order to let
            // the CodePush runtime determine where to get the JS
            // bundle location from on each app start
            @Override
            protected String getJSBundleFile() {
                return CodePush.getJSBundleFile();
            }
        };
    }
    ```

3. Get Staging and Production keys from terminal.

    `appcenter codepush deployment list --app gupta-ji6/CodePushRN -k`

4. Add the **Staging** Deployment key to `strings.xml`:

   ```xml
   <resources>
     <string name="app_name">AppName</string>
     <string moduleConfig="true" name="CodePushDeploymentKey">DeploymentKey</string>
    </resources>
    ```

5. Install & link [`react-native-code-push'](https://github.com/microsoft/react-native-code-push)

    ```lang-sh
    npm install --save react-native-code-push # Install the code push client sdk
    react-native link react-native-code-push  # Link this npm with the natvie build
    ```

## Plugin Usage

1. Go to `App.js` and import `react-native-code-push` module:

    `import codePush from "react-native-code-push";`

1. Add a Touchable Opacity with a corresponding handler.

    ```jsx
    <TouchableOpacity onPress={this.onButtonPress}>
    <Text>Check for updates</Text>
    </TouchableOpacity>
    ```

    ```javascript
    onButtonPress() {
        codePush.sync({
        updateDialog: true,
        installMode: codePush.InstallMode.IMMEDIATE
        });
    }
    ```

2. Make the above changes and check in the code in the remote git repo.
This will trigger a build automatically in the app center and we’ll receive a mail with the new download link for the updated app. Once installed, it’ll look something like this.

    <p align="center">
        <img src="https://user-images.githubusercontent.com/21218732/77157721-ecacb880-6ac7-11ea-869e-0e5bc9c11d2c.jpg" height="400" width="auto">
    </p>

## Releasing Update with App Center CLI

Once your app has been configured and distributed to your users, and you have made some JS and/or asset changes, it's time to instantly release them! ([*See More*](https://docs.microsoft.com/en-us/appcenter/distribution/codepush/react-native#releasing-updates))

1. Change some text/component in your code.

2. Run:

    ```lang-sh
    appcenter codepush release-react -a <ownerName>/<appName>

    appcenter codepush release-react -a gupta-ji6/CodePushRN -d Staging #for staging
    appcenter codepush release-react -a gupta-ji6/CodePushRN -d Production #for production
    ```

3. Reopen the latest mobile aap installed.
4. Click on **Check for updates** button.
5. Click **Install** on prompt.

    <p align="center">
        <img src="https://user-images.githubusercontent.com/21218732/77158395-3944c380-6ac9-11ea-8fe9-01feb7b892ca.jpg" height="400" width="auto">
    </p>

6. Voila! :tada: You'll see your updated changes after the app reopens.

    <p align="center">
        <img src="https://user-images.githubusercontent.com/21218732/77157934-56c55d80-6ac8-11ea-8042-4b6bfdfdff41.jpg" height="400" width="auto">
    </p>

## References

- [React Native updates with VS App Center CodePush](https://codeburst.io/react-native-updates-with-vs-app-center-codepush-3d56ef07f1c4)
- [App Center Codepush with React-Native](https://binbytes.com/blog/app-center-codepush-with-react-native)
- [React Native Client SDK](https://docs.microsoft.com/en-us/appcenter/distribution/codepush/react-native)
- [react-native-code-push](https://github.com/Microsoft/react-native-code-push#codepush)
- [Android Setup](https://github.com/microsoft/react-native-code-push/blob/master/docs/setup-android.md#code-signing-setup)
- [Android Build](https://docs.microsoft.com/en-us/appcenter/build/android/)
- [code-push-cli](https://www.npmjs.com/package/code-push-cli)
- [React Native ❤ CodePush](https://medium.com/spritle-software/react-native-codepush-b86f0ea8432c)
- [Get started with ‘CodePush’ (React-Native)](https://medium.com/@rajanmaharjan/get-started-with-wonderful-technology-d838aafdc2d3)