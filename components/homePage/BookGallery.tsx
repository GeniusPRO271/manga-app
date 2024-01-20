import { ScrollView, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import Book, { BookParams } from "./Book";
import {
  buildQueryString,
  fetchChapterList,
  fetchChapterListBookParams,
  fetchMangaBookParams,
} from "../../api/api-services";
import { PressableView, Text, View } from "../Themed";
import { ChapterListParams, MangaSearchParams } from "../../api/param";
import { router } from "expo-router";

export default function BookGallery({
  title,
  MangaSearchParams,
  ChapterSeatchParams,
  onRefresh,
  setRefresh,
  atRefresh,
}: {
  title: string;
  MangaSearchParams?: MangaSearchParams;
  ChapterSeatchParams?: ChapterListParams;
  onRefresh?: boolean;
  setRefresh?: React.Dispatch<React.SetStateAction<boolean>>;
  atRefresh?() : void
}) {
  const [books, setBooks] = useState<BookParams[]>();

  // Fetch data when the component mounts
  async function fetchData() {
    try {
      console.log("featching...");
      if (MangaSearchParams) {
        const result: BookParams[] = await fetchMangaBookParams(
          MangaSearchParams
        );
        setBooks(result);
      } else if (ChapterSeatchParams) {
        const result: BookParams[] = await fetchChapterListBookParams(
          ChapterSeatchParams
        );
        setBooks(result);
      }
      if (setRefresh && onRefresh) {
        setRefresh(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    if(atRefresh){
      atRefresh()
    }
    fetchData();
  }, [onRefresh]);

  return (
    <View style={styles.bookGalleryContainer}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={[styles.titleStyle, { flex: 1 }]}>{title}</Text>
        <PressableView onPress={() => {MangaSearchParams && router.push(`/more/${buildQueryString(MangaSearchParams)}`)}}>
          <Text style={styles.viewMoreStyle}>View more</Text>
        </PressableView>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.booksContainer}
      >
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
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  bookGalleryContainer: {
    paddingVertical: 20,
    backgroundColor: "transparent",
  },
  titleStyle: {
    fontSize: 18,
    fontWeight: "bold",
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  booksContainer: {
    display: "flex",
    flexDirection: "row",
  },
  viewMoreStyle: {
    fontSize: 14,
    fontWeight: "bold",
    paddingHorizontal: 10,
    marginBottom: 10,
    opacity: 0.8,
  },
});
