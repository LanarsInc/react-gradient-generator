import { useState } from 'react';
import GradientColorGenerator from './components/GradientColorGenerator';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import Button from '@mui/material/Button';


const App = () => {

  const [gradient, setGradient] = useState('radial-gradient(circle, rgb(0, 255, 95) 6%, rgb(0, 0, 0) 13%, rgb(247, 242, 35) 19%, rgb(234, 6, 6) 30%, rgb(0, 0, 0) 38%, rgb(0, 237, 255) 49%, rgb(0, 145, 249) 56%, rgb(234, 0, 255) 66%, rgb(0, 0, 0) 79%, rgb(52, 0, 237) 91%)');

  return (
    <div className='gradient'>
      <div className='gradient__container'>
        <GradientColorGenerator
          value={gradient}
          handleChange={(value) => setGradient(value)}
          maxColorsCount={10}
        />

        <div className='gradient-code-result'>
          <div className='gradient-code-result__value'>
            {gradient}
          </div>

          <Button
            variant='contained'
            endIcon={<ContentPasteIcon />}
            onClick={() => navigator.clipboard.writeText(gradient)}
          >
            Copy
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;
