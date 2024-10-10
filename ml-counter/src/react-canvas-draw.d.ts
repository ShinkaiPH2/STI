declare module 'react-canvas-draw' {
  import * as React from 'react';

  export interface CanvasDrawProps {
    canvasWidth?: number;
    canvasHeight?: number;
    brushRadius?: number;
    lazyRadius?: number;
    brushColor?: string;
    catenaryColor?: string;
    gridColor?: string;
    backgroundColor?: string;
    hideGrid?: boolean;
    disabled?: boolean;
    imgSrc?: string;
    saveData?: string;
    immediateLoading?: boolean;
    hideInterface?: boolean;
    gridSizeX?: number;
    gridSizeY?: number;
    gridLineWidth?: number;
    loadTimeOffset?: number;
    onChange?: (canvas: CanvasDraw) => void;
  }

  export default class CanvasDraw extends React.Component<CanvasDrawProps> {
    clear(): void;
    getSaveData(): string;
    loadSaveData(saveData: string, immediate?: boolean): void;
    undo(): void;
  }
}