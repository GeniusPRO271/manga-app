import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  TextInputProps,
} from "react-native";
import React, { useState } from "react";
import Icon from "../Icon";
import { PressableView, View } from "../Themed";
import { FontAwesome } from "@expo/vector-icons";

export default function SearchBar(props: TextInputProps) {
  const [search, setSearch] = useState<string>();

  return (
      <SafeAreaView
        style={{
          position: "absolute",
          width: "100%",
          zIndex: 10,
          alignSelf: "center",
        }}
      >
        <View style={{ marginBottom: "auto" }}>
          <View style={styles.container}>
            <View
              style={[
                styles.icon,
                { alignItems: "flex-start", marginHorizontal: 10 },
              ]}
            >
              <FontAwesome name="search" size={16} color={"#393939"} />
            </View>
            <TextInput
              placeholder={props.placeholder}
              placeholderTextColor={props.placeholderTextColor}
              style={styles.searchBarText}
              onChange={(e) => {
                setSearch(e.nativeEvent.text);
              }}
              value={search}
              onSubmitEditing={props.onSubmitEditing}
            ></TextInput>
            <PressableView
              style={[
                styles.icon,
                { alignItems: "flex-start", marginHorizontal: 10 },
              ]}
            >
              <Icon
                alt="yo"
                source="barsfiler"
                width={16}
                height={16}
                fill={"#393939"}
              />
            </PressableView>
          </View>
        </View>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#d9d9d9",
    paddingVertical: 10,
  },
  searchBarText: {
    flex: 1,
    fontSize: 14,
    fontWeight: "700",
    opacity: 0.8,
  },
  icon: {
    backgroundColor: "transparent",
  },
});
