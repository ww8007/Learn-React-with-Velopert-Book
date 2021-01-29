import React from 'react';
import ColorBox from './components/ColorBox';
import { ColorProvider } from './contexts/Color';
function App() {
  return (
    <ColorProvider>
      <div>
        <ColorBox />
      </div>
    </ColorProvider>
  );
}

export default App;
