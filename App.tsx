import { View } from 'react-native';
import Toggle from './src/components/Toggle';
import { useState } from 'react';

function App() {
  const [state, setState] = useState<boolean>(false);
  return (
    <View style={{ paddingTop: 20, flex: 1, paddingHorizontal: 20 }}>
      <Toggle onChange={setState} value={state} />
    </View>
  );
}

export default App;
