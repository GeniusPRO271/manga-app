// yourApiServiceFile.ts

import axios, { AxiosResponse } from "axios";
import { BookParams } from "../components/homePage/Book";
import { MangaDetailsParams, MangaParams } from "../app/manga/[id]";
import { ChapterDetails, ChapterListParams, MangaFeedParams, MangaSearchParams } from "./param";
import { MangaFeed } from "../app/chapters/[id]";

const API_BASE_URL = "https://api.mangadex.org";

const mangaDexApi = axios.create({
  baseURL: API_BASE_URL,
});

export const buildQueryString = (
  params: MangaSearchParams | ChapterListParams
): string => {
  const queryString = Object.entries(params)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        // Handle array values
        return value
          .map((v) => `${encodeURIComponent(key)}=${encodeURIComponent(v)}`)
          .join("&");
      } else if (typeof value === "object") {
        // Handle object values (OrderParams)
        return Object.entries(value)
          .map(
            ([field, direction]) =>
              `${encodeURIComponent(`order[${field}]`)}=${encodeURIComponent(
                direction
              )}`
          )
          .join("&");
      }
      // Handle other types
      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    })
    .join("&");

  return queryString;
};

export const fetchMangaData = async (params: MangaSearchParams) => {
  try {
    const queryParams = buildQueryString(params);

    const response = await mangaDexApi.get(`/manga?${queryParams}`, {
      headers: {
        accept: "application/json",
      },
    });

    return response.data;
  } catch (error) {
    const queryParams = buildQueryString(params);

    console.log("error using url=", `/manga?${queryParams}`);
    throw error;
  }
};

export const fetchMangaBookParams = async (
  params: MangaSearchParams
): Promise<BookParams[]> => {
  try {
    const queryParams = buildQueryString(params);

    const response: AxiosResponse = await mangaDexApi.get(
      `/manga?${queryParams}`,
      {
        headers: {
          accept: "application/json",
        },
      }
    );

    return response.data.data.map((d: any) => ({
      id: d.id,
      title: Object.values(d.attributes.title)[0],
      author:
        (
          d.relationships.find(
            (relationship: any) => relationship.type === "author"
          ) || {}
        ).attributes?.name || "not found",
      cover:
        (
          d.relationships.find(
            (relationship: any) => relationship.type === "cover_art"
          ) || {}
        ).attributes?.fileName || "not found",
      status:
        d.attributes.status.charAt(0).toUpperCase() +
        d.attributes.status.slice(1),
    }));
  } catch (error) {
    const queryParams = buildQueryString(params);

    console.log("error using url=", `/manga?${queryParams}`);
    throw error;
  }
};

export const fetchMangaBookParamsFromString = async (
  params: string
): Promise<BookParams[]> => {
  try {
    const response: AxiosResponse = await mangaDexApi.get(`/manga?${params}`, {
      headers: {
        accept: "application/json",
      },
    });

    return response.data.data.map((d: any) => ({
      id: d.id,
      title: Object.values(d.attributes.title)[0],
      author:
        (
          d.relationships.find(
            (relationship: any) => relationship.type === "author"
          ) || {}
        ).attributes?.name || "not found",
      cover:
        (
          d.relationships.find(
            (relationship: any) => relationship.type === "cover_art"
          ) || {}
        ).attributes?.fileName || "not found",
      status:
        d.attributes.status.charAt(0).toUpperCase() +
        d.attributes.status.slice(1),
    }));
  } catch (error) {
    console.log("error using url=", `/manga?${params}`);
    throw error;
  }
};

export const fetchMangaBookDetailsParams = async (
  id: string | string[]
): Promise<{ data: MangaParams; details: MangaDetailsParams[] }> => {
  try {
    const response: AxiosResponse = await mangaDexApi.get(
      `/manga/${id}?includes%5B%5D=manga&includes%5B%5D=cover_art&includes%5B%5D=author&includes%5B%5D=artist`,
      {
        headers: {
          accept: "application/json",
        },
      }
    );

    const titleObject = response.data.data.attributes.title;
    const firstTitle = Object.values(titleObject)[0];
    const author =
      (
        response.data.data.relationships.find(
          (relationship: any) => relationship.type === "author"
        ) || {}
      ).attributes?.name || "not found";
    const artist =
      (
        response.data.data.relationships.find(
          (relationship: any) => relationship.type === "artist"
        ) || {}
      ).attributes?.name || "not found";

    const details: MangaDetailsParams[] = [
      { type: "Type", data: response.data.data.type },
      { type: "Author", data: author },
      { type: "Artist", data: artist },
      { type: "Year", data: response.data.data.attributes.year },
      { type: "Status", data: response.data.data.attributes.status },
      {
        type: "Original lenguaje",
        data: response.data.data.attributes.originalLanguage,
      },
      {
        type: "Publication demographic",
        data: response.data.data.attributes.publicationDemographic,
      },
    ];
    const data: MangaParams = {
      id: response.data.data.id,
      title: firstTitle as string,
      author: author,
      cover:
        (
          response.data.data.relationships.find(
            (relationship: any) => relationship.type === "cover_art"
          ) || {}
        ).attributes?.fileName || "not found",
      description: response.data.data.attributes.description.en,
    };

    return { data: data, details: details };
  } catch (error) {
    console.log("error using url=", `/manga/${id}`);
    throw error;
  }
};

export const fetchChapterList = async (params: ChapterListParams) => {
  try {
    const queryParams = buildQueryString(params);

    const response: AxiosResponse = await mangaDexApi.get(
      `/chapter?${queryParams}`,
      {
        headers: {
          accept: "application/json",
        },
      }
    );

    console.log(
      "chapterResponse:",
      response.data.data.map((chapter: any) => {
        return chapter.relationships.find(
          (relationship: any) => relationship.type === "manga"
        ).attributes.title.en;
      })
    );
    return response.data;
  } catch (error) {
    const queryParams = buildQueryString(params);

    console.log("error using url=", `/chapter?${queryParams}`);
    throw error;
  }
};

export const fetchChapterDetails = async (
  id: string | string[]
): Promise<ChapterDetails> => {
  try {
    const response: AxiosResponse = await mangaDexApi.get(`/chapter/${id}`, {
      headers: {
        accept: "application/json",
      },
    });

    return {
      title: response.data.data.attributes.title,
      chapterNum: response.data.data.attributes.chapter,
    };
  } catch (error) {
    console.log("error using url=", `/chapter/${id}`);
    throw error;
  }
};

export const fetchChapterListBookParams = async (params: ChapterListParams) => {
  try {
    const queryParams = buildQueryString(params);

    const response: AxiosResponse = await mangaDexApi.get(
      `/chapter?${queryParams}`,
      {
        headers: {
          accept: "application/json",
        },
      }
    );

    const mangas: string[] = response.data.data.map((chapter: any) => {
      const mangaRelationship = chapter.relationships.find(
        (relationship: any) => relationship.type === "manga"
      );
      return mangaRelationship ? mangaRelationship.id : null;
    });

    // Filtering out duplicates from the 'mangas' array
    let mangasFiltered: string[] = mangas.filter((value, index, self) => {
      return value !== null && self.indexOf(value) === index;
    });

    const paramsMangas: MangaSearchParams = {
      limit: 10,
      "includedTags[]": [],
      includedTagsMode: "AND",
      excludedTagsMode: "OR",
      "ids[]": mangas,
      "contentRating[]": ["safe", "suggestive", "erotica"],
      "includes[]": ["cover_art", "author"],
    };

    const mangasData: BookParams[] = await fetchMangaBookParams(paramsMangas);

    return mangasData;
  } catch (error) {
    const queryParams = buildQueryString(params);

    console.log("error using url=", `/chapter?${queryParams}`);
    throw error;
  }
};

export const featchMangaFeed = async (
  id: string | string[],
  params: MangaFeedParams
): Promise<{ result: MangaFeed[]; total: number }> => {
  try {
    const queryParams = buildQueryString(params);

    const response: AxiosResponse = await mangaDexApi.get(
      `/manga/${id}/feed?${queryParams}`,
      {
        headers: {
          accept: "application/json",
        },
      }
    );

    const resultData: MangaFeed[] = response.data.data.map((chapters: any) => {
      return {
        id: chapters.id,
        volumen: chapters.attributes.volume,
        chapter: chapters.attributes.chapter,
        chapterTitle: chapters.attributes.title,
        externalUrl: chapters.attributes.externalUrl,
      };
    });
    return { result: resultData, total: response.data.total };
  } catch (error) {
    const queryParams = buildQueryString(params);

    console.log("error using url=", `/chapter?${queryParams}`);
    throw error;
  }
};

const generateImageUrls = (response: any) => {
  if (
    !response ||
    !response.baseUrl ||
    !response.chapter ||
    !response.chapter.hash ||
    !response.chapter.data
  ) {
    return [];
  }

  const { baseUrl, chapter } = response;
  const { hash, data } = chapter;

  if (!Array.isArray(data) || data.length === 0) {
    return [];
  }

  const imageUrls = data.map(
    (imageName) => `${baseUrl}/data/${hash}/${imageName}`
  );
  return imageUrls;
};

export const featchChapterImages = async (id: string | string[]) => {
  try {
    const response: AxiosResponse = await mangaDexApi.get(
      `/at-home/server/${id}`,
      {
        headers: {
          accept: "application/json",
        },
      }
    );
    const imageUrls = generateImageUrls(response.data);
    return imageUrls;
  } catch (error) {
    console.log("error using url=", `/at-home/server/${id}`);
    throw error;
  }
};
