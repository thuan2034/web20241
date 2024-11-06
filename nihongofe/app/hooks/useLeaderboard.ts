import { fakeUsers } from "~/utils/fakeUsers";
import { useBoundStore } from "~/hooks/useBoundStore";

export const useLeaderboardUsers = () => {
  const userInfo = {
    name: "",
    xp: 0, 
    isCurrentUser: true,
  } as const;
  return [...fakeUsers, userInfo].sort((a, b) => b.xp - a.xp); 
};

export const useLeaderboardRank = () => {
  const leaderboardUsers = useLeaderboardUsers();
  const index = leaderboardUsers.findIndex((user) => user.isCurrentUser);
  return index === -1 ? null : index + 1; 
};
