import { Image, StyleSheet} from "react-native";
import React, { useState } from "react";
import { PressableView, Text, View } from "../Themed";
import { router } from "expo-router";

export type BookParams = {
  id: string;
  title: string;
  author: string;
  cover: string;
  status: string
};

export default function Book(params: BookParams) {
  const [loaded, setLoaded] = useState<boolean>(false)
  return (
    <View style={{backgroundColor:"transparent"}}>
      <PressableView onPress={() => {router.push(`/manga/${params.id}`)}} style={styles.bookContainer}>
        <Image
          onLoad={() => setLoaded(true)}
          onError={(error) => console.error('Image load error', error)}
          style={styles.coverImage}
          source={{
            uri: `https://uploads.mangadex.org/covers/${params.id}/${params.cover}`,
          }}
        />
      </PressableView>
      <View style={styles.textContainer}>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.titleStyle}>
          {params.title}
        </Text>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.authorStyle}>
          {params.author}
        </Text>
        <View style={styles.activityTag}>
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.activityTagText}>
            {params.status}
            </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bookContainer: {
    width: 150,
    aspectRatio: 1 / 1.5,
    margin: 1,
    borderRadius: 20,
    justifyContent:"center",    
    alignItems:"center",
    backgroundColor:"#393939"
  },
  coverImage: {
    objectFit: "fill",
    width: "100%",
    height: "100%",
    borderRadius:20

  },
  textContainer: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    backgroundColor:"transparent"
  },
  titleStyle: {
    fontWeight: "bold",
    fontSize: 14,
    maxWidth: 120,
  },
  authorStyle: {
    fontSize: 12,
    maxWidth: 120,
    marginBottom:10,
  },
  activityTag:{
    borderRadius: 20,
    fontSize: 10,
    paddingVertical:5,
    paddingHorizontal:10,
    backgroundColor:"rgb(90,19,22)",
    alignSelf:"flex-start"
    
  },
  activityTagText:{
    fontSize: 10,
    color:"white",
    maxWidth: 120,
  }
});
