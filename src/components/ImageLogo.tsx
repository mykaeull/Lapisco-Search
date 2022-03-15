import { Image } from "@chakra-ui/react";

export function ImageLogo() {
  return (
    <Image
      h={["100px", "150px", "200px"]}
      w={["200px", "300px", "400px"]}
      src="/logo-lapisco.png"
      alt="Logo Lapisco"
    />
  );
}
