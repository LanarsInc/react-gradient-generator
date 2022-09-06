import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import GradientHeader from './GradientHeader';
import GradientPreview from './GradientPreview';
import GradientActivePalette from './GradientActivePalette';
import GradientTypeAndAngle from './GradientTypeAndAngle';
import GradientRangeSettings from './GradientRangeSettings';
import GradientCode from './GradientCode';
import {
  hex2rgb,
  splitGradientString,
} from '../../shared/utils' ;
import {
  defaultGradient,
  GRADIENT_TYPES,
  maxColorsCount,
} from '../../shared/constants';
import {
  IGeneralMessage,
  IPalette,
} from '../../shared/types/interfaces';

import './GradientGenerator.scss';

interface GradientGeneratorProps {
  addNewMessage: (newMessage: Partial<IGeneralMessage>) => void;
}

const GradientGenerator:React.FC<GradientGeneratorProps> = ({ addNewMessage }) => {

  const [gradient, setGradient] = useState<string>('');
  const [palettes, setPalettes] = useState<IPalette[]>([]);
  const [activePalette, setActivePalette] = useState<IPalette | null>(null);
  const [gradientType, setGradientType] = useState<string>('');
  const [gradientPosition, setGradientPosition] = useState<string>('');

  useEffect(() => {
    initGradient(defaultGradient);
  }, []);

  useEffect(() => {
    createGradientBackground();
  }, [palettes, gradientType, gradientPosition]);

  const initGradient = (gradient) => {
    const [gradientType, gradientAnglePoint, gradientPalettes] = splitGradientString(gradient);

    const newGradientPalettes = gradientPalettes.map((palette) => ({
      ...palette,
      id: uuidv4(),
    }));

    setPalettes(newGradientPalettes);
    handleGradientTypeChange(gradientType, gradientAnglePoint);
    setActivePalette(newGradientPalettes[0]);
  };

  const createGradientBackground = () => {
    const sortedPallets = [...palettes].sort((paletteA, paletteB) => paletteA.position - paletteB.position);
    const colorsAndPositionsString = sortedPallets.map((palette) => `${palette.color} ${palette.position}%`).join(', ');
    const result = `${gradientType}-gradient(${gradientPosition}, ${colorsAndPositionsString})`;

    setGradient(result);
  };

  const resetGradient = () => {
    initGradient(defaultGradient);
  };

  const handleGradientColorChange = (color, isRGBA) => {
    const clonePalettes = [...palettes];
    const neededPalette = clonePalettes.find((palette) => palette.id === activePalette.id);

    if (isRGBA) {
      neededPalette.color = color;
    } else {
      const rgbColor = hex2rgb(color);
      const { r, g, b, a } = rgbColor;

      neededPalette.color = `rgba(${r}, ${g}, ${b}, ${a})`;
    }

    setActivePalette(neededPalette);
    setPalettes(clonePalettes);
  };

  const handleSwapColors = () => {
    const sortedPallets = [...palettes].sort((paletteA, paletteB) => paletteA.position - paletteB.position);
    const reversePositions = sortedPallets.map((palette) => palette.position).reverse();
    const swappedPalettes = sortedPallets
      .map((palette, paletteIndex) => ({
        ...palette,
        position: reversePositions[paletteIndex],
      }))
      .sort((paletteA, paletteB) => paletteA.position - paletteB.position);

    setPalettes(swappedPalettes);
  };

  const handleDeletePalette = (paletteId) => {
    const filteredPalettes = palettes.filter((palette) => palette.id !== paletteId);

    setPalettes(filteredPalettes);
    setActivePalette(filteredPalettes[0]);
  };

  const handleGradientTypeChange = (type, angle) => {
    if (type === GRADIENT_TYPES.LINEAR) {
      setGradientType(type);
      setGradientPosition(angle ?? '0deg');
    } else {
      setGradientType(type);
      setGradientPosition(angle ?? 'circle at 50% 50%');
    }
  };

  return (
    <div className='gradient-generator'>

      <GradientHeader resetGradient={resetGradient} />

      <div className='gradient-generator__main'>
        <GradientPreview
          palettes={[...palettes]}
          activePaletteId={activePalette?.id}
          gradient={gradient}
          setActivePalette={setActivePalette}
          handleDeletePalette={handleDeletePalette}
        />

        <div className='gradient-generator-settings'>
          <div className='gradient-generator-settings__top'>
            <GradientRangeSettings
              gradient={gradient}
              maxColorsCount={maxColorsCount}
              palettes={palettes}
              activePalette={activePalette}
              setPalettes={setPalettes}
              setActivePalette={setActivePalette}
              handleSwapColors={handleSwapColors}
            />

            {activePalette &&
              <GradientActivePalette
                activePalette={activePalette}
                canDeletePalette={palettes.length > 2}
                handleGradientColorChange={handleGradientColorChange}
                handleDeletePalette={handleDeletePalette}
              />
            }
          </div>

          <GradientTypeAndAngle
            gradientType={gradientType}
            gradientPosition={gradientPosition}
            handleGradientTypeChange={handleGradientTypeChange}
            setGradientPosition={setGradientPosition}
          />
        </div>
      </div>

      <GradientCode
        gradient={gradient}
        addNewMessage={addNewMessage}
      />
    </div>
  );
}

export default GradientGenerator;
