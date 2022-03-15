import { Box, SimpleGrid } from "@chakra-ui/react";
import { Card } from "./Card";

type User = {
  gender: string;
  name: string;
  email: string;
  birthDate: string;
  profileLink: string;
};

interface CardGridProps {
  usersList: User[];
}

export function CardGrid({ usersList }: CardGridProps) {
  return (
    <SimpleGrid w="100%" columns={{ sm: 1, md: 2, lg: 2, xl: 3 }} spacing="4">
      {usersList.map((user, index) => (
        <Card user={user} key={index} />
      ))}
    </SimpleGrid>
  );
}
