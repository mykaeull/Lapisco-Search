import { Avatar, Divider, Flex, HStack, Text, VStack } from "@chakra-ui/react";

type User = {
  user: {
    gender: string;
    name: string;
    email: string;
    birthDate: string;
    profileLink: string;
  };
};

export function Card({ user }: User) {
  return (
    <Flex
      justifyContent="center"
      bg="gray.900"
      boxShadow="dark-lg"
      rounded="lg"
      height="120px"
    >
      <HStack spacing={["1", "4"]} m={["1", "4"]} w="100%">
        <Avatar size="lg" name={user.name} src={user.profileLink} />
        <Divider orientation="vertical" borderColor="gray.700" />
        <VStack spacing="2px" fontSize="small">
          <strong style={{ textTransform: "capitalize" }}>{user.name}</strong>
          <Text color="gray.500">{user.gender}</Text>
          <Text color="gray.500">{user.birthDate}</Text>
          <Text>{user.email}</Text>
        </VStack>
      </HStack>
    </Flex>
  );
}
