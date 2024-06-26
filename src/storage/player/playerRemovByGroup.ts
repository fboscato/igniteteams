import AsyncStorage from "@react-native-async-storage/async-storage";
import { PLAYER_COLLECTION } from "@storage/storageConfig";
import { playersGetByGroup } from "./playersGetByGroup";

export async function playerRemovByGroup(playerName: string, group: string) {
  try {
    const storage = await playersGetByGroup(group);
    const filtered = storage.filter((player) => player.name !== playerName);
    const player = JSON.stringify(filtered);
    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, player);
  } catch (error) {
    throw error;
  }
}
