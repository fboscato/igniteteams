import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppError } from "src/util/AppError";
import { PLAYER_COLLECTION } from "@storage/storageConfig";
import { playersGetByGroup } from "./playersGetByGroup";
import { PlayersStorageDTO } from "./PlayerStorageDTO";

export async function playerAddByGroup(newPlayer: PlayersStorageDTO, group: string){
  try {
    const storagePlayers = await playersGetByGroup(group)

    const playerAlertExists = storagePlayers.filter(player => player.name === newPlayer.name)
    if (playerAlertExists.length > 0) {
      throw new AppError("Esta pessoa ja está cadastrada em um time aqui")
    }

    const storage = JSON.stringify([...storagePlayers,newPlayer])    
    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, storage)
  
  } catch (error) {
    throw error
  }
}