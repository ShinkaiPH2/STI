import { Box, Image } from "@chakra-ui/react";

interface Hero {
  id: number;
  name: string;
  img: string;
}

interface HeroListProps {
  heroes: Hero[];
}

const HeroList = ({ heroes }: HeroListProps) => {
  return (
    <Box display="flex" flexWrap="wrap">
      {heroes.map((hero) => (
        <Box key={hero.id} draggable>
          <Image src={hero.img} alt={hero.name} />
          <p>{hero.name}</p>
        </Box>
      ))}
    </Box>
  );
};

export default HeroList;
