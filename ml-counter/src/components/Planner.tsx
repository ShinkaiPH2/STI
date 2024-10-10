import React, { useState, useEffect } from "react";
import { Box, Input, Button, Flex } from "@chakra-ui/react";
import HeroList from "./HeroList";
import Slot from "./Slot";
import MapCanvas from "./MapCanvas"; // Import the MapCanvas component

interface Hero {
  id: number;
  name: string;
  img: string;
}

const Planner = () => {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [filteredHeroes, setFilteredHeroes] = useState<Hero[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchHeroes = async () => {
      const heroList: Hero[] = [];
      for (let heroId = 1; heroId <= 126; heroId++) {
        const response = await fetch(`https://api.gms.moontontech.com/api/gms/source/2669606/2756564`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            pageSize: 20,
            filters: [{ field: "hero_id", operator: "eq", value: heroId }],
            pageIndex: 1,
            object: [],
          }),
        });
        const data = await response.json();
        const heroData = data.data.records[0].data.hero.data;
        heroList.push({
          id: heroId,
          name: heroData.name,
          img: heroData.head,
        });
      }
      setHeroes(heroList);
      setFilteredHeroes(heroList); 
    };

    fetchHeroes();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value.toLowerCase());
    const filtered = heroes.filter(hero =>
      hero.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredHeroes(filtered);
  };

  return (
    <Flex direction="column" align="center" p={4}>
      <Input
        placeholder="Search Hero"
        value={searchQuery}
        onChange={handleSearch}
        mb={4}
      />
      <HeroList heroes={filteredHeroes} />
      <Button onClick={() => setFilteredHeroes(heroes)} mb={4}>
        Reset
      </Button>
      <Box mb={4}>
        <Slot onDrop={(e) => console.log("Hero dropped")} />
      </Box>
      <MapCanvas /> 
    </Flex>
  );
};

export default Planner;