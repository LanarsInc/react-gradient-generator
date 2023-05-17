import React, { FC, useEffect, useRef } from 'react';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import darkModeButton from '../assets/dark-mode-button.json';

interface ThemeModeSwitcherProps {
  activeThemeMode: string | null;
  toggleThemeMode: () => void;
}

const LottieExample: FC<ThemeModeSwitcherProps> = ({
  activeThemeMode,
  toggleThemeMode,
}) => {
  const ref = useRef<LottieRefCurrentProps>(null);

  useEffect(() => {
    ref.current?.setSpeed(3);
  }, []);

  useEffect(() => {
    if (activeThemeMode === 'dark') {
      ref.current?.playSegments([0, 150], true);
    } else {
      ref.current?.playSegments([300, 481], true);
    }
  }, [activeThemeMode]);

  return (
    <div
      style={{
        width: '300px',
        height: '300px',
        cursor: 'pointer',
      }}
      onClick={() => toggleThemeMode()}
    >
      <Lottie
        lottieRef={ref}
        autoplay={false}
        loop={false}
        animationData={darkModeButton}
      />
    </div>
  );
};

export default LottieExample;
