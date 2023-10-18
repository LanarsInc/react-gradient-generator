import React, { useCallback, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { motion as m } from 'framer-motion';
import { hexToRgbaObject, splitGradientString } from '@shared/utils';
import { defaultGradient, GradientTypes } from '@shared/constants';
import { GeneralMessage, Palette } from '@shared/types/interfaces';
import { SectionAppearAnimation } from '@shared/animation';
import GradientPreview from './GradientPreview';
import GradientActivePalette from './GradientActivePalette';
import GradientTypeAndAngle from './GradientTypeAndAngle';
import GradientRangeSettings from './GradientRangeSettings';
import GradientCode from './GradientCode';

import './GradientGenerator.scss';

interface GradientGeneratorProps {
  addNewMessage: (newMessage: Omit<GeneralMessage, 'id'>) => void;
}

const GradientGenerator: React.FC<GradientGeneratorProps> = ({
  addNewMessage,
}) => {
  const [gradient, setGradient] = useState<string>('');
  const [palettes, setPalettes] = useState<Palette[]>([]);
  const [activePalette, setActivePalette] = useState<Palette | null>(null);
  const [gradientType, setGradientType] = useState<GradientTypes>(
    GradientTypes.LINEAR
  );
  const [gradientPosition, setGradientPosition] = useState<string>('');

  const handleGradientTypeChange = (type: GradientTypes, angle: string) => {
    if (type === GradientTypes.LINEAR) {
      setGradientType(type);
      setGradientPosition(angle);
    } else {
      setGradientType(type);
      setGradientPosition(angle);
    }
  };

  const initGradient = useCallback((neededGradient: string) => {
    const [
      extractedGradientType,
      extractedGradientAnglePoint,
      gradientPalettes,
    ] = splitGradientString(neededGradient);

    const newGradientPalettes = gradientPalettes.map((palette) => ({
      ...palette,
      id: uuidv4(),
    }));

    setPalettes(newGradientPalettes);
    handleGradientTypeChange(
      extractedGradientType as GradientTypes,
      extractedGradientAnglePoint
    );
    setActivePalette(newGradientPalettes[0]);
  }, []);

  useEffect(() => {
    initGradient(defaultGradient);
  }, [initGradient]);

  const createGradientBackground = useCallback(() => {
    const sortedPallets = [...palettes].sort(
      (paletteA, paletteB) => paletteA.position - paletteB.position
    );
    const colorsAndPositionsString = sortedPallets
      .map((palette) => `${palette.color} ${palette.position}%`)
      .join(', ');
    const result = `${gradientType}-gradient(${gradientPosition}, ${colorsAndPositionsString})`;

    setGradient(result);
  }, [palettes, gradientType, gradientPosition]);

  useEffect(() => {
    createGradientBackground();
  }, [createGradientBackground, palettes, gradientType, gradientPosition]);

  const resetGradient = () => {
    initGradient(defaultGradient);
  };

  const handleGradientColorChange = (color: string, isRGBA?: boolean) => {
    const clonePalettes = [...palettes];
    const neededPalette = clonePalettes.find(
      (palette) => palette.id === activePalette?.id
    );

    if (neededPalette) {
      if (isRGBA) {
        neededPalette.color = color;
      } else {
        const { red, green, blue, alpha } = hexToRgbaObject(color);
        neededPalette.color = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
      }

      setActivePalette(neededPalette);
      setPalettes(clonePalettes);
    }
  };

  const handleDeletePalette = (paletteId: string) => {
    const filteredPalettes = palettes
      .filter((palette) => palette.id !== paletteId)
      .sort((paletteA, paletteB) => paletteA.position - paletteB.position);

    setPalettes(filteredPalettes);
    setActivePalette(filteredPalettes[0]);
  };

  return (
    <div className="gradient-generator">
      <div className="gradient-generator__main">
        <GradientPreview
          gradient={gradient}
          palettes={palettes}
          activePaletteId={activePalette?.id}
          setActivePalette={setActivePalette}
          handleDeletePalette={handleDeletePalette}
        />

        <div className="gradient-generator-settings">
          <m.div
            initial={SectionAppearAnimation.initial}
            animate={SectionAppearAnimation.animate}
            transition={SectionAppearAnimation.transition(0.2)}
            className="gradient-generator-settings__top"
          >
            <GradientRangeSettings
              gradient={gradient}
              palettes={palettes}
              activePaletteId={activePalette?.id}
              setPalettes={setPalettes}
              setActivePalette={setActivePalette}
            />

            {activePalette && (
              <GradientActivePalette
                activePalette={activePalette}
                canDeletePalette={palettes.length > 2}
                handleGradientColorChange={handleGradientColorChange}
                handleDeletePalette={handleDeletePalette}
              />
            )}
          </m.div>

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
        resetGradient={resetGradient}
        addNewMessage={addNewMessage}
      />
    </div>
  );
};

export default GradientGenerator;
