import React from 'react';
import ColorBox from './components/ColorBox';
import SelectColor from './components/SelectColor';
import { ColorProvider } from './contexts/Color';
function App() {
  return (
    <ColorProvider>
      <div>
        <SelectColor></SelectColor>
        <ColorBox />
      </div>
    </ColorProvider>
  );
}

export default App;
