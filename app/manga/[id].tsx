import { Image, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import {
  PressableView,
  Text,
  View,
  ScrollViewThemed,
} from "../../components/Themed";
import { fetchMangaBookDetailsParams } from "../../api/api-services";
import { FontAwesome } from "@expo/vector-icons";
import MangaPageHeader from "../../components/mangaPage/MangaPageHeader";
import MangaDetails from "../../components/mangaPage/MangaDetails";

export type MangaParams = {
  id: string;
  title: string;
  author: string;
  cover: string;
  description: string;
};

export type MangaDetailsParams = {
  type: string;
  data: string;
};

export default function Manga() {
  const { id } = useLocalSearchParams();
  const [mangaParams, setMangaParams] = useState<MangaParams>();
  const [menuSelected, setMenuSelected] = useState<number>(0);
  const [mangaDetails, setMangaDetails] = useState<MangaDetailsParams[]>();

  async function fetchData(id: string | string[]) {
    try {
      const {
        data,
        details,
      }: { data: MangaParams; details: MangaDetailsParams[] } =
        await fetchMangaBookDetailsParams(id);

      setMangaParams(data);
      setMangaDetails(details);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchData(id);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={styles.mainContainer}>
        <ScrollView>
          <View
            lightColor="#EAEAEA"
            darkColor="#393939"
            style={styles.bookLayout}
          >
            <View style={styles.bookContainer}>
              <Image
                style={styles.coverImage}
                source={{
                  uri: `https://uploads.mangadex.org/covers/${id}/${mangaParams?.cover}`,
                }}
              />
            </View>
          </View>
          <View style={styles.textContainer}>
            <View style={{ flex: 1 }}>
              <Text style={styles.titleStyle}>{mangaParams?.title}</Text>
              <Text style={styles.authorStyle}>{mangaParams?.author}</Text>
            </View>
            <View style={styles.playIconContainer}>
              <PressableView
                style={styles.playIcon}
                onPress={() => {
                  router.push(`/chapters/${id}`);
                }}
              >
                <FontAwesome name="play" color={"pink"} size={16} />
              </PressableView>
            </View>
          </View>
          <View style={styles.descriptionContainer}>
            <View style={styles.descriptionTextTitleContainer}>
              <PressableView
                style={{ paddingRight: 20 }}
                onPress={() => setMenuSelected(0)}
              >
                <Text style={styles.titleDescriptionStyle}>
                  About the Manga
                </Text>
                {menuSelected == 0 && (
                  <View
                    darkColor="#D9D9D9"
                    lightColor="#D9D9D9"
                    style={{ width: "100%", height: 0.8, borderRadius: 10 }}
                  />
                )}
              </PressableView>
              <PressableView onPress={() => setMenuSelected(1)}>
                <Text style={styles.titleDescriptionStyle}>Details</Text>
                {menuSelected == 1 && (
                  <View
                    darkColor="#D9D9D9"
                    lightColor="#D9D9D9"
                    style={{ width: "100%", height: 0.8, borderRadius: 10 }}
                  />
                )}
              </PressableView>
            </View>
          </View>
          <View style={styles.descriptionTextContainer}>
            {menuSelected == 0 ? (
              <Text style={styles.descriptionText}>
                {mangaParams?.description}
              </Text>
            ) : (
              mangaDetails && <MangaDetails mangaDetails={mangaDetails} />
            )}
          </View>
          <MangaPageHeader />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  bookLayout: {
    height: 150 * 3,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  bookContainer: {
    width: 150,
    aspectRatio: 1 / 1.5,
    borderRadius: 20,
  },
  textContainer: {
    padding: 10,
    marginBottom: 10,
    flexDirection: "row",
  },
  titleStyle: {
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 10,
  },
  authorStyle: {
    fontWeight: "400",
    fontSize: 20,
  },
  descriptionContainer: {
    alignItems: "center",
  },
  descriptionTextTitleContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  titleDescriptionStyle: {
    fontSize: 16,
    fontWeight: "600",
  },
  coverImage: {
    objectFit: "fill",
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
  playIconContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
    marginRight: 10,
  },
  playIcon: {
    backgroundColor: "rgb(90,19,22)",
    width: 64,
    height: 64,
    borderRadius: 52,
    justifyContent: "center",
    alignItems: "center",
  },
  descriptionTextContainer: {
    padding: 20,
  },
  descriptionText: {
    fontSize: 14,
  },
});
