import AsyncStorage from "@react-native-async-storage/async-storage";

export const getFavorites = async (): Promise<string[]> => {
  const favorites = await AsyncStorage.getItem("favorites");
  console.log("featching favorites");
  if (favorites != null) {
    console.log("favorites",favorites);
    const parsedFavorites = JSON.parse(favorites);
    return parsedFavorites;
  }
  return [];
};
export const AddToFavorites = async (id: string) => {
  try {
    const favorites = await getFavorites();
    console.log("adding favorites");
    if (Array.isArray(favorites)) {
        console.log("favorites",favorites);
      favorites.push(id);
      console.log("favorites after: ", favorites);
      const stringToSave = JSON.stringify(favorites);
      await AsyncStorage.setItem("favorites", stringToSave);
    }
  } catch {
    console.log("ERROR AT SAVING FAVORITE");
  }
};
export const RemoveFromFavorites = async (id: string) => {
  try {
    const favorites = await getFavorites();

    if (Array.isArray(favorites)) {
      const updatedFavorites = favorites.filter(
        (favoriteId) => favoriteId !== id
      );

      const stringToSave = JSON.stringify(updatedFavorites);
      await AsyncStorage.setItem("favorites", stringToSave);
    }
  } catch (error) {
    console.error("ERROR AT REMOVING FROM FAVORITES:", error);
  }
};

export const isFavorite = async (id: string) => {
  try {
    const favorites = await getFavorites();
    return favorites.includes(id);
  } catch (error) {
    console.error("ERROR AT CHECKING FAVORITES:", error);
    return false;
  }
};
