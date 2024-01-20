import { RefreshControl, ScrollView, StyleSheet, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchBar from "../components/homePage/SearchBar";
import BookGallery from "../components/homePage/BookGallery";
import { View } from "../components/Themed";
import { ChapterListParams, MangaSearchParams } from "../api/param";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFavorites } from "../api/storage";

export default function HomePage() {
  const [refresh, setRefresh] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<string[]>();
  const [refreshKey, setRefreshKey] = useState<number>(0);

  const TopRatedParams: MangaSearchParams = {
    limit: 10,
    includedTagsMode: "AND",
    excludedTagsMode: "OR",
    "contentRating[]": ["safe", "suggestive", "erotica"],
    order: {
      rating: "desc",
      followedCount: "desc",
      latestUploadedChapter: "desc",
    },
    "includes[]": ["manga", "cover_art", "author"],
  };

  const TopActionParams: MangaSearchParams = {
    limit: 10,
    "includedTags[]": ["391b0423-d847-456f-aff0-8b0cfc03066b"],
    includedTagsMode: "AND",
    excludedTagsMode: "OR",
    "contentRating[]": ["safe", "suggestive", "erotica"],
    order: {
      relevance: "desc",
      followedCount: "desc",
      latestUploadedChapter: "desc",
    },
    "includes[]": ["manga", "cover_art", "author"],
  };

  const LatestParams: ChapterListParams = {
    limit: 100,

    "contentRating[]": ["safe", "suggestive", "erotica"],
    "translatedLanguage[]": ["en"],
    order: {
      readableAt: "desc",
    },
    "includes[]": ["manga"],
  };

  const FavoritesParams: MangaSearchParams = {
    limit: 10,
    includedTagsMode: "AND",
    excludedTagsMode: "OR",
    "contentRating[]": ["safe", "suggestive", "erotica"],
    order: {
      relevance: "desc",
      latestUploadedChapter: "desc",
    },
    "includes[]": ["manga", "cover_art", "author"],
    "ids[]": favorites,
  };

  const handleRefresh = () => {
    setRefresh(true);
    parseFavorites();
  };

  const parseFavorites = async () => {
    const data = await getFavorites();
    setFavorites(data);
  };
  useEffect(() => {
    parseFavorites();
  }, []);

  return (
    <View>
      <SearchBar
        placeholder="Search for Manga"
        placeholderTextColor={"#393939"}
        onSubmitEditing={(name) => {
          router.push(`/search/${name.nativeEvent.text}`);
        }}
      />
      <SafeAreaView style={styles.homeContainer}>
        <ScrollView
          style={{ marginTop: 20 }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refresh} onRefresh={handleRefresh} />
          }
        >
          {favorites && favorites.length > 0 && (
            <BookGallery
              title="My List"
              MangaSearchParams={FavoritesParams}
              onRefresh={refresh}
              setRefresh={setRefresh}
              atRefresh={async () => {
                await getFavorites();
              }}
            />
          )}
          <BookGallery
            title="Latest Updates"
            ChapterSeatchParams={LatestParams}
            onRefresh={refresh}
            setRefresh={setRefresh}
          />
          <BookGallery title="Top Rated" MangaSearchParams={TopRatedParams} />
          <BookGallery
            title="Popular Action"
            MangaSearchParams={TopActionParams}
          />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    padding: 10,
  },
});
