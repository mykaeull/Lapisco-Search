import { Flex, Icon, Input } from "@chakra-ui/react";
import { RiSearchLine } from "react-icons/ri";

interface SearchBoxProps {
  userSearch: string;
  setUserSearch: (userSearch: string) => void;
}

export function SearchBox({ userSearch, setUserSearch }: SearchBoxProps) {
  return (
    <Flex
      as="label"
      // flex="1"
      py="2"
      px="8"
      ml="6"
      w="100%"
      // minWidth={400}
      alignSelf="center"
      color="gray.400"
      position="relative"
      bg="gray.100"
      borderRadius="full"
    >
      <Input
        color="gray.800"
        variant="unstyled"
        px="4"
        mr="4"
        placeholder="Buscar na plataforma"
        _placeholder={{ color: "gray.400" }}
        value={userSearch}
        onChange={(e) => setUserSearch(e.target.value)}
      />
      <Icon as={RiSearchLine} fontSize="20" />
    </Flex>
  );
}
