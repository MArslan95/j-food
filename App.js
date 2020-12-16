
// export default function App() {
//   return (
//     <View
//       style={{
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <Text>Universal React with Expo</Text>
//     </View>
//   );
// }
import React from 'react';
import Main from './components/MainComponent';

export default class App extends React.Component {
  render() {
    return (
      <Main />
    );
  }
}