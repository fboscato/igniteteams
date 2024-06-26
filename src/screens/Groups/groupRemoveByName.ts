import AsyncStorage from "@react-native-async-storage/async-storage";

import { GROUP_COLLECTION, PLAYER_COLLECTION } from "@storage/storageConfig";
import { groupsGetAll } from "@storage/group/groupGetAll";

export async function groupRemoveByName(groupDeleted:string) {
  try {
    const storageGroup = await groupsGetAll()
    const groups = storageGroup.filter(group => group !== groupDeleted)
    await AsyncStorage.setItem(GROUP_COLLECTION, JSON.stringify(groups))
    await AsyncStorage.removeItem(`${PLAYER_COLLECTION}-${groupDeleted}`)
  } catch (error) {
    
  }
}