import { StyleSheet, SafeAreaView } from "react-native";
import React from "react";
import { PressableView, Text, View } from "../Themed";
import Icon from "../Icon";
import { router } from "expo-router";
import { ChapterDetails } from "../../api/param";

export default function ReadingHeader(params : ChapterDetails) {
  return (
    <SafeAreaView>
      <View style={{ marginBottom: "auto" }}>
        <View style={styles.container}>
          <PressableView onPress={() => {router.canGoBack() && router.back()}} style={[styles.icon, { alignItems: "flex-start" }]}>
            <Icon
              source="chevron_left"
              width={16}
              height={16}
              alt="chevron_right"
              fill={"#D9D9D9"}
            />
          </PressableView>
          <Text
            darkColor="#F4F4F4"
            lightColor="#393939"
            style={styles.text}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {params.chapterNum}. {params.title}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    flex: 1,
    fontSize: 14,
    fontWeight: "700",
    paddingVertical: 15,
    opacity: 0.8,
  },
  Maincontainer: {},
  container: {
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {

  },
});
