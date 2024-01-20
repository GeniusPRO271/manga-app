import { NativeScrollEvent, SafeAreaView, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { featchMangaFeed } from "../../api/api-services";
import { router, useLocalSearchParams } from "expo-router";
import { MangaFeedParams } from "../../api/param";
import {
  PressableView,
  ScrollViewThemed,
  Text,
  View,
} from "../../components/Themed";
import { ScrollView } from "react-native-gesture-handler";
import SearchBar from "../../components/homePage/SearchBar";
import Icon from "../../components/Icon";

export type MangaFeed = {
  id: string;
  volumen: string;
  chapter: string;
  chapterTitle: string;
  externalUrl: string;
};

export default function ChaptersList() {
  const { id } = useLocalSearchParams();
  const [chaptersData, setChatpersData] = useState<MangaFeed[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(0);
  const [limit, setLimit] = useState<number>(50);
  const [total, setTotal] = useState<number>(1);

  const chapterParams: MangaFeedParams = {
    limit: limit,
    offset: offset,
    order: {
      volume: "asc",
      chapter: "asc",
    },
    "translatedLanguage[]": ["en"],
  };

  async function fetchData(id: string | string[]) {
    try {
      console.log("featching with offset:", offset);
      console.log("featching with total:", total);
      if (offset < total) {
        console.log("featching with offset:", offset);
        console.log("featching with params:", chapterParams);
        const { result, total }: { result: MangaFeed[]; total: number } =
          await featchMangaFeed(id, chapterParams);

        setTotal(total);

        setOffset((prev) => {
          return prev + limit;
        });

        setChatpersData((prev) => [...prev, ...result]);
        if (loading) {
          console.log("featching...");
          setLoading(false);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    if (loading) {
      fetchData(id);
    }
  }, [loading]);

  useEffect(() => {
    fetchData(id);
  }, []);

  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }: NativeScrollEvent) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  return (
    <View>
      <SafeAreaView>
        <View style={styles.Maincontainer}>
          <SearchBar
            placeholder="Search for Manga"
            placeholderTextColor={"white"}
            style={{marginHorizontal: 10}}
            onSubmitEditing={() => {
              router.replace("/search/${name}");
            }}
          />
          <ScrollView
          showsVerticalScrollIndicator={false}
            scrollEventThrottle={400}
            style={{ marginBottom: "auto", marginTop: 10 }}
            onScroll={({ nativeEvent }) => {
              if (isCloseToBottom(nativeEvent)) {
                if (loading == false) {
                  console.log("end of list");
                  setLoading(true);
                }
              }
            }}
          >
            {chaptersData &&
              chaptersData.map((chapter: MangaFeed, index:number) => {
                return (
                  <PressableView
                    onPress={() => {
                      router.push(`/chapters/reading/${chapter.id}`);
                    }}
                    key={index}
                    style={{ paddingHorizontal: 10, marginBottom: "auto" }}
                  >
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
                        {chapter.chapter}.{" "}
                        {chapter.chapterTitle && chapter.chapterTitle}
                      </Text>
                      <View style={styles.icon}>
                        <Icon
                          source="chevron_right"
                          width={16}
                          height={16}
                          alt="chevron_right"
                          fill={"#D9D9D9"}
                        />
                      </View>
                    </View>
                  </PressableView>
                );
              })}
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    flex: 1,
    fontSize: 14,
    fontWeight: "700",
    paddingVertical: 18,
    opacity: 0.8,
  },
  Maincontainer: {
  },
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    alignItems: "flex-end",
  },
});
