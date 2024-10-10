import CanvasDraw from "react-canvas-draw";
import { Box, Button } from "@chakra-ui/react";

const MapCanvas = () => {
  let canvasRef: CanvasDraw | null = null;

  const clearCanvas = () => {
    if (canvasRef) {
      canvasRef.clear();
    }
  };

  const saveCanvas = () => {
    if (canvasRef) {
      const data = canvasRef.getSaveData();
      console.log("Canvas data:", data);
    }
  };

  return (
    <Box>
      <CanvasDraw
        ref={(canvas: CanvasDraw) => (canvasRef = canvas)}
        canvasWidth={800}
        canvasHeight={600}
        brushRadius={2}
        lazyRadius={0}
      />
      <Button onClick={clearCanvas} mt={2} mr={2}>
        Clear
      </Button>
      <Button onClick={saveCanvas} mt={2}>
        Save
      </Button>
    </Box>
  );
};

export default MapCanvas;