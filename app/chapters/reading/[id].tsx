import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { featchChapterImages, fetchChapterDetails } from "../../../api/api-services";
import { View } from "../../../components/Themed";
import ReadingHeader from "../../../components/readingPage/ReadingHeader";
import { ChapterDetails } from "../../../api/param";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function ReadingChapter() {
  const [images, setImages] = useState<string[]>();
  const [chapterDetails, setChapterDetails] = useState<ChapterDetails>();
  const { id } = useLocalSearchParams<{id : string}>();

  async function fetchData(id: string | string[]) {
    try {
      const result: string[] = await featchChapterImages(id);
      const details : ChapterDetails = await fetchChapterDetails(id);
      setChapterDetails(details)
      setImages(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchData(id);
  }, []);

  return (
    <View>
      {chapterDetails && <ReadingHeader title={chapterDetails?.title} chapterNum={chapterDetails?.chapterNum}/>}
      <SafeAreaView>
        <ScrollView>
          {images &&
            images.map((uri: string, index: number) => {
              return (
                <View style={styles.imageContainer} key={index}>
                  <Image
                    onLoad={() => console.log("loading image...")}
                    onError={(error) =>
                      console.error("Image load error", error)
                    }
                    style={styles.image}
                    source={{
                      uri: uri,
                    }}
                  />
                </View>
              );
            })}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    backgroundColor: "#393939",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: windowWidth,
    height: windowHeight,
    objectFit: "fill",
  },
});
