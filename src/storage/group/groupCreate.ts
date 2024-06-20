import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION } from "@storage/storageConfig";
import { groupsGetAll } from "./groupGetAll";
import { AppError } from "src/util/AppError";

export async function groupCreate(newGroup: string) {
  try {
    const storedGroups = await groupsGetAll()
    const groupAlertExists = storedGroups.includes(newGroup)
    if (groupAlertExists) {
      throw new AppError(`Group ${newGroup} already exists`);
    }    
    const storage = JSON.stringify([...storedGroups,newGroup])
    await AsyncStorage.setItem(GROUP_COLLECTION, storage);
  } catch (error) {
    throw error;
  }
}
