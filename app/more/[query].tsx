import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import Book, { BookParams } from "../../components/search/Book";
import SearchBar from "../../components/homePage/SearchBar";
import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "../../components/Themed";
import { ScrollView } from "react-native-gesture-handler";
import { fetchMangaBookParamsFromString } from "../../api/api-services";

function updateLimit(queryString: string, newLimitValue: number) {
  const regex = /(\blimit=)(\d+)/;

  if (queryString.match(regex)) {
    return queryString.replace(regex, `$1${newLimitValue}`);
  } else {
    // If 'limit' is not present in the original query string, you may choose to add it.
    // Uncomment the line below if you want to add it.
    // return `${queryString}&limit=${newLimitValue}`;
    return queryString;
  }
}

export default function More() {
  const { query } = useLocalSearchParams<{ query: string }>();
  const [books, setBooks] = useState<BookParams[]>();

  async function fetchData() {
    try {
      if (query) {
        let newQuery = updateLimit(query, 50);
        const result: BookParams[] = await fetchMangaBookParamsFromString(
          newQuery
        );
        setBooks(result);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

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
        <ScrollView style={{ marginTop: 30 }}>
          <View style={styles.bookContainer}>
            {books &&
              books.map((book: BookParams) => {
                return (
                  <View key={book.id} style={styles.bookItem}>
                    <Book
                      id={book.id}
                      title={book.title}
                      author={book.author}
                      cover={book.cover}
                      status={book.status}
                    />
                  </View>
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
    backgroundColor: "transparent",
  },
  bookItem: {
    width: "49%",
     // Adjust as needed to leave space between items
    marginBottom: 10, // Adjust as needed
  },
});
