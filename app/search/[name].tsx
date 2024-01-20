import { Image, StyleSheet, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { MangaSearchParams } from "../../api/param";
import Book, { BookParams } from "../../components/homePage/Book";
import { fetchMangaBookParams } from "../../api/api-services";
import SearchBar from "../../components/homePage/SearchBar";
import { SafeAreaView } from "react-native-safe-area-context";
import { PressableView, View } from "../../components/Themed";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";

export default function Search() {
  const { name } = useLocalSearchParams<{ name: string }>();
  const [books, setBooks] = useState<BookParams[]>();
  const [search, setSearch] = useState<string>(name);
  const [refresh, setRefresh] = useState<boolean>(false);
  const SearchParams: MangaSearchParams = {
    limit: 50,
    title: search,
    includedTagsMode: "AND",
    excludedTagsMode: "OR",
    "availableTranslatedLanguage[]": ["en"],
    "contentRating[]": ["safe", "suggestive", "erotica"],
    order: {
      relevance: "desc",
      followedCount: "desc",
    },
    "includes[]": ["manga", "cover_art", "author"],
  };

  async function fetchData() {
    try {
      console.log("featching...");
      if (SearchParams) {
        const result: BookParams[] = await fetchMangaBookParams(SearchParams);
        setBooks(result);
      }
      if (setRefresh) {
        setRefresh(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  function onRefresh() {
    setRefresh(true);
  }
  useEffect(() => {
    fetchData();
  }, [refresh, search]);

  return (
    <View>
      <SafeAreaView style={styles.container}>
        <SearchBar
          placeholder="Search for Manga"
          placeholderTextColor={"#393939"}
          onSubmitEditing={(name) => {
            router.push(`/search/${name.nativeEvent.text}`);
          }}
        />
        <ScrollView
        style={{marginTop: 30}}
          refreshControl={
            <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
          }
        >
          <View style={styles.bookContainer}>
            {books &&
              books.map((book: BookParams) => {
                return (
                  <Book
                    key={book.id}
                    id={book.id}
                    title={book.title}
                    author={book.author}
                    cover={book.cover}
                    status={book.status}
                  />
                );
              })}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transaprent",
  },
  bookContainer: {
    marginTop: 10,
    flexDirection: "row", // Arrange items horizontally
    flexWrap: "wrap", // Allow items to wrap to the next row
    justifyContent: "space-between", // Space evenly between items
    padding: 10,
    backgroundColor: "transaprent",
  },
});
