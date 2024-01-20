export type ChapterListParams = {
  limit?: number;
  offset?: number;
  "ids[]"?: string[];
  title?: string;
  "groups[]"?: string[];
  uploader?: string;
  manga?: string; // Assuming $uuid is a placeholder for string
  "volume[]"?: string[];
  chapter?: string;
  "translatedLanguage[]"?: string[];
  "originalLanguage[]"?: string[];
  "excludedOriginalLanguage[]"?: string[];
  "contentRating[]"?: string[]; // safe, suggestive, erotic, pornographic
  "excludedGroups[]"?: string[];
  "excludedUploaders[]"?: string[];
  includeFutureUpdates?: string; // Change type to the appropriate one (string, boolean, etc.) based on your API's expectations
  includeEmptyPages?: number; // Change type to the appropriate one (number, boolean, etc.) based on your API's expectations
  includeFuturePublishAt?: number; // Change type to the appropriate one (number, boolean, etc.) based on your API's expectations
  includeExternalUrl?: number; // Change type to the appropriate one (number, boolean, etc.) based on your API's expectations
  createdAtSince?: string;
  updatedAtSince?: string;
  publishAtSince?: string;
  order?: Record<string, "asc" | "desc">; // Assuming order is an object with field names and sorting directions
  "includes[]": string[];
};

export type MangaSearchParams = {
  limit?: number;
  offset?: number;
  title?: string;
  authorOrArtist?: string;
  "authors[]"?: string[];
  "artists[]"?: string[];
  year?: number;
  "includedTags[]"?: string[];
  includedTagsMode?: string;
  "excludedTags[]"?: string[];
  excludedTagsMode?: string;
  "status[]"?: string[];
  "originalLanguage[]"?: string[];
  "excludedOriginalLanguage[]"?: string[];
  "availableTranslatedLanguage[]"?: string[];
  "publicationDemographic[]"?: string[];
  "ids[]"?: string[];
  "contentRating[]"?: string[];
  createdAtSince?: string;
  updatedAtSince?: string;
  order?: Record<string, "asc" | "desc">;
  "includes[]"?: string[];
  hasAvailableChapters?: string;
  group?: string;
};

export type MangaFeedParams = {
  limit?: number;
  offset?: number;
  "translatedLanguage[]"?: string[];
  "originalLanguage[]"?: string[];
  "excludedOriginalLanguage[]"?: string[];
  "contentRating[]"?: string[];
  "excludedGroups[]"?: string[];
  "excludedUploaders[]"?: string[];
  includeFutureUpdates?: string;
  createdAtSince?: string;
  updatedAtSince?: string;
  publishAtSince?: string;
  order?: Record<string, "asc" | "desc">;
  "includes[]"?: string[]
  includeEmptyPages?: number;
  includeFuturePublishAt?: number;
  includeExternalUrl?: number;
};

export type ChapterDetails = {
  title: string
  chapterNum : string
}
