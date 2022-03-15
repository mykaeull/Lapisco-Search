import { Flex, VStack, Spinner } from "@chakra-ui/react";
// import { GetStaticProps } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { CardGrid } from "../components/CardGrid";
import { ImageLogo } from "../components/ImageLogo";
import { SearchBox } from "../components/SearchBox";
import { api } from "../services/api";

type User = {
  gender: string;
  name: string;
  email: string;
  birthDate: string;
  profileLink: string;
};

// interface HomeProps {
//   users: User[];
// }

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);

  const [userSearch, setUserSearch] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const requestUsers = async () => {
      setIsLoading(true);
      try {
        const { data } = await api.get(
          "?results=12&inc=gender,name,email,dob,picture"
        );

        const usersFormated = data.results.map((user) => {
          return {
            gender: user.gender,
            name: (user.name.first + " " + user.name.last).toLowerCase(),
            email: user.email,
            birthDate: new Date(user.dob.date).toLocaleString("pt-BR", {
              day: "numeric",
              month: "numeric",
              year: "numeric",
            }),
            profileLink: user.picture.medium,
          };
        });

        setUsers(usersFormated);
      } catch (err) {
        alert(err.message);
      }
      setIsLoading(false);
    };
    requestUsers();
  }, []);

  useEffect(() => {
    const usersFound = users.filter((user) =>
      user.name.includes(userSearch.toLowerCase())
    );
    setUsers(usersFound);
  }, [userSearch]);

  return (
    <>
      <Head>
        <title>Lapisco Search</title>
      </Head>
      <Flex
        w="100%"
        my="6"
        maxWidth={[350, 460, 725, 950, 1080]}
        marginX="auto"
        p="10"
        bg="gray.800"
        borderRadius="8px"
      >
        <VStack spacing="8" w="100%" justify="center">
          <ImageLogo />
          <SearchBox userSearch={userSearch} setUserSearch={setUserSearch} />
          {isLoading ? (
            <Spinner thickness="4px" speed="0.65s" color="blue.500" size="xl" />
          ) : (
            <CardGrid usersList={users} />
          )}
        </VStack>
      </Flex>
    </>
  );
}

// export const getStaticProps: GetStaticProps = async () => {
//   const { data } = await api.get(
//     "?results=12&inc=gender,name,email,dob,picture"
//   );

//   const users = data.results.map((user) => {
//     return {
//       gender: user.gender,
//       name: user.name.first + " " + user.name.last,
//       email: user.email,
//       birthDate: new Date(user.dob.date).toLocaleString("pt-BR", {
//         day: "numeric",
//         month: "numeric",
//         year: "numeric",
//       }),
//       profileLink: user.picture.medium,
//     };
//   });

//   console.log(users);

//   return {
//     props: {
//       users,
//     },
//     revalidate: 60 * 60 * 24, // 24h
//   };
// };
