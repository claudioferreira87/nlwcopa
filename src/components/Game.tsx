import { useState } from "react";
import { Button, HStack, Text, useTheme, VStack } from "native-base";
import { X, Check } from "phosphor-react-native";
import { getName } from "country-list";
import dayjs from "dayjs";
import ptBR from "dayjs/locale/pt-br";

import { Team } from "./Team";
import { Loading } from "./Loading";

interface GuessProps {
  id: string;
  gameId: string;
  createdAt: string;
  participantId: string;
  firstTeamPoints: number;
  secondTeamPoints: number;
}

export interface GameProps {
  id: string;
  firstTeamCountryCode: string;
  secondTeamCountryCode: string;
  firstGBCountry?: string;
  secondGBCountry?: string;
  guess: null | GuessProps;
  date: string;
  firstTeamPoints: number;
  secondTeamPoints: number;
}

interface Props {
  data: GameProps;
  onGuessConfirm: () => void;
  setFirstTeamPoints: (value: string) => void;
  setSecondTeamPoints: (value: string) => void;
  isGuessLoading: boolean;
}

export function Game({
  data,
  setFirstTeamPoints,
  setSecondTeamPoints,
  onGuessConfirm,
  isGuessLoading,
}: Props) {
  const { colors, sizes } = useTheme();
  const when = dayjs(data.date)
    .locale(ptBR)
    .format("DD [de] MMM [de] YYYY [às] HH:00[h]");

  const handleCountryName = (iso: string) => {
    if (iso === "GB") return "England";
    if (iso === "WL") return "Walles";

    return getName(iso);
  };

  return (
    <VStack
      w="full"
      bgColor="gray.800"
      rounded="sm"
      alignItems="center"
      borderBottomWidth={3}
      borderBottomColor="yellow.500"
      mb={3}
      p={4}
    >
      <Text color="gray.100" fontFamily="heading" fontSize="sm">
        {handleCountryName(data.firstTeamCountryCode)} vs.
        {handleCountryName(data.secondTeamCountryCode)}
      </Text>

      <Text color="gray.200" fontSize="xs">
        {when}
      </Text>

      <HStack
        mt={4}
        w="full"
        justifyContent="space-between"
        alignItems="center"
      >
        <Team
          code={data.firstTeamCountryCode}
          position="right"
          onChangeText={setFirstTeamPoints}
          points={
            data.guess?.firstTeamPoints >= 0 ? data.guess.firstTeamPoints : null
          }
        />

        <X color={colors.gray[300]} size={sizes[6]} />

        <Team
          code={data.secondTeamCountryCode}
          position="left"
          onChangeText={setSecondTeamPoints}
          points={
            data.guess?.secondTeamPoints >= 0
              ? data.guess.secondTeamPoints
              : null
          }
        />
      </HStack>

      {!data.guess &&
        (isGuessLoading ? (
          <Loading />
        ) : (
          <Button
            size="xs"
            w="full"
            bgColor="green.500"
            mt={4}
            onPress={onGuessConfirm}
          >
            <HStack alignItems="center">
              <Text color="white" fontSize="xs" fontFamily="heading" mr={3}>
                CONFIRMAR PALPITE
              </Text>

              <Check color={colors.white} size={sizes[4]} />
            </HStack>
          </Button>
        ))}
    </VStack>
  );
}
