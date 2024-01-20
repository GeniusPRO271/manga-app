import { StyleSheet } from "react-native";
import React from "react";
import { View, Text } from "../Themed";
import Icon from "../Icon";
import { MangaDetailsParams } from "../../app/manga/[id]";

export default function MangaDetails({
  mangaDetails,
}: {
  mangaDetails: MangaDetailsParams[];
}) {
  return (
    <View>
      {mangaDetails.map(({ type, data }: MangaDetailsParams, index: number) => {
        if (data) {
          return (
            <View style={{ marginBottom: "auto" }} key={index}>
              <View
                darkColor="rgba(217, 217, 217, 0.5)"
                lightColor="#D9D9D9"
                style={{ width: "100%", height: 0.5, borderRadius: 10 }}
              />
              <View style={styles.container}>
                <Text
                  darkColor="#F4F4F4"
                  lightColor="#393939"
                  style={styles.text}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {type}
                </Text>
                <View style={styles.icon}>
                  <Text
                    darkColor="#F4F4F4"
                    lightColor="#393939"
                    style={styles.text}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {data}
                  </Text>
                </View>
              </View>
            </View>
          );
        }
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    flex: 1,
    fontSize: 14,
    fontWeight: "700",
    paddingVertical: 15,
    opacity: 0.8,
  },
  Maincontainer: {},
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    alignItems: "flex-end",
  },
});
