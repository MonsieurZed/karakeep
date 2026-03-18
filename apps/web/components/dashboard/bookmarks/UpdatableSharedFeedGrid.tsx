"use client";

/**
 * Grille de bookmarks pour le fil partagé.
 * Utilise la procédure getSharedFeed pour charger les bookmarks de tous les utilisateurs.
 */

import { useInfiniteQuery } from "@tanstack/react-query";

import type { ZGetBookmarksResponse } from "@karakeep/shared/types/bookmarks";
import { useTRPC } from "@karakeep/shared-react/trpc";

import BookmarksGrid from "./BookmarksGrid";

export default function UpdatableSharedFeedGrid({
  initialBookmarks,
}: {
  initialBookmarks: ZGetBookmarksResponse;
}) {
  const api = useTRPC();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      api.bookmarks.getSharedFeed.infiniteQueryOptions(
        { useCursorV2: true },
        {
          initialData: () => ({
            pages: [initialBookmarks],
            pageParams: [null],
          }),
          initialCursor: null,
          getNextPageParam: (lastPage) => lastPage.nextCursor,
          refetchOnMount: true,
        },
      ),
    );

  return (
    <BookmarksGrid
      bookmarks={data.pages.flatMap((b) => b.bookmarks)}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
      isFetchingNextPage={isFetchingNextPage}
      showEditorCard={false}
    />
  );
}
