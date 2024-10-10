import { Box } from "@chakra-ui/react";

interface SlotProps {
  onDrop: (e: React.DragEvent<HTMLElement>) => void;
}

const Slot = ({ onDrop }: SlotProps) => (
  <Box
    onDragOver={(e) => e.preventDefault()}
    onDrop={onDrop}
    border="1px solid"
    minHeight="100px"
    width="100px"
  />
);

export default Slot;
