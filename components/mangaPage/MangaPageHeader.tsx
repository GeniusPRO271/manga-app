import {StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { PressableView } from "../Themed";
import { router, useLocalSearchParams } from "expo-router";
import { AddToFavorites, RemoveFromFavorites, isFavorite } from "../../api/storage";

export default function MangaPageHeader() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [favorite, setFavorite] = useState<boolean>(false);

  const getFavoriteState = async () => {
    const Isfavorite = await isFavorite(id);
    setFavorite(Isfavorite);
  };
  useEffect(() => {
    getFavoriteState();
  }, []);

  return (
    <View style={styles.headerContainer}>
      <View style={{ flex: 1 }}>
          <PressableView
            lightColor="#393939"
            darkColor=""
            style={styles.iconContainer}
            onPress={() => {
              router.canGoBack() && router.back()
            }}
          >
            <FontAwesome name="angle-left" color={"white"} size={32} />
          </PressableView>
      </View>
      <View style={{ flex: 1, alignItems: "flex-end" }}>
      {favorite ? (
          <PressableView
            lightColor="#393939"
            darkColor=""
            style={styles.iconContainer}
            onPress={async () => {
              await RemoveFromFavorites(id)
              setFavorite(false)
            }}
          >
            <FontAwesome name="bookmark" color={"yellow"} size={16} />
          </PressableView>
        ) : (
          <PressableView
            lightColor="#393939"
            darkColor=""
            style={styles.iconContainer}
            onPress={ async () => {
              console.log("pressed")
              await AddToFavorites(id)
              setFavorite(true)
            }}
          >
            <FontAwesome name="bookmark" color={"white"} size={16} />
          </PressableView>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 62,
  },
  headerContainer: {
    position: "absolute",
    left: 0,
    top: 0,
    padding: 20,
    flexDirection: "row",
  },
});
