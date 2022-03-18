import {
  Flex,
  VStack,
  Spinner,
  IconButton,
  Icon,
  Button,
} from "@chakra-ui/react";
// import { GetStaticProps } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { CardGrid } from "../components/CardGrid";
import { ImageLogo } from "../components/ImageLogo";
import { SearchBox } from "../components/SearchBox";
import { api } from "../services/api";
import { AiOutlineArrowUp } from "react-icons/ai";

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

  const [temporaryUsers, setTemporaryUsers] = useState<User[]>([]);

  const [userSearch, setUserSearch] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 600) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
  }, []);

  useEffect(() => {
    const requestUsers = async () => {
      setIsLoading(true);
      try {
        const { data } = await api.get(
          "?results=100&inc=gender,name,email,dob,picture"
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
        setTemporaryUsers(usersFormated.filter((user, index) => index < 12));
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
    setTemporaryUsers(usersFound);
  }, [userSearch]);

  function handleClickShowMore() {
    const arrayUsers = users.filter(
      (user, index) =>
        index >= temporaryUsers.length && index < temporaryUsers.length + 12
    );
    setTemporaryUsers(temporaryUsers.concat(arrayUsers));
  }

  function handleClickShowLess() {
    setTemporaryUsers(users.filter((user, index) => index < 12));
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

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
            <CardGrid usersList={temporaryUsers} />
          )}
          {userSearch !== "" ? null : temporaryUsers.length !== users.length ? (
            <Button bg="#1A365D" size="md" onClick={handleClickShowMore}>
              Mostrar mais
            </Button>
          ) : (
            <Button bg="#1A365D" size="md" onClick={handleClickShowLess}>
              Mostrar menos
            </Button>
          )}
        </VStack>
      </Flex>
      {isVisible && (
        <IconButton
          // float="right"
          // m="4"
          position="fixed"
          bottom="0.5rem"
          right="0.5rem"
          onClick={scrollToTop}
          colorScheme="blue"
          aria-label="Search database"
          icon={<Icon as={AiOutlineArrowUp} />}
        />
      )}
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
