import { AppRegistry } from 'react-native';
import App from './app/App';
import '../shim.js';
import 'react-native-get-random-values';
import '@ethersproject/shims';

import 'text-encoding';

AppRegistry.registerComponent('main', () => App);
