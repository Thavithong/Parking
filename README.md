# Parking

`````Install and configure Camera for QR Code scanner view`````
react-native 0.62.2

````` I. Camera `````
npm i react-native-camera@3.23.0
do not link. Please following by the guiline below :

Add permissions to your app android/app/src/main/AndroidManifest.xml file:
    <uses-permission android:name="android.permission.CAMERA" />
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.RECORD_AUDIO"/>

Insert the following lines in android/app/build.gradle:
    defaultConfig {
        applicationId "com.parking"
        minSdkVersion rootProject.ext.minSdkVersion
        targetSdkVersion rootProject.ext.targetSdkVersion
        versionCode 1
        versionName "1.0"
        missingDimensionStrategy 'react-native-camera', 'general'   `````// <--- insert this line `````
        multiDexEnabled true    `````// <--- insert this line `````
    }

````` II. qrcode-scanner-view `````
npm i react-native-qrcode-scanner-view
do not link. Please following by the guiline below :

edit node_mudule > react-native-qrcode-scanner-view > QRScanner.js
```` comment two lines ````
    componentDidMount(){
        // AppState.addEventListener('change', this.handleAppStateChange);
    }
  
    componentWillUnmount(){
        // AppState.removeEventListener('change', this.handleAppStateChange);
        // this.rnCamera && this.rnCamera.pausePreview();
    }
