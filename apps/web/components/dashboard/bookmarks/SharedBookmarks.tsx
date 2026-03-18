/**
 * Composant serveur pour le fil partagé.
 * Charge les bookmarks de tous les utilisateurs (non archivés) avec les infos d'auteur.
 */

import { redirect } from "next/navigation";
import { api } from "@/server/api/client";
import { getServerAuthSession } from "@/server/auth";

import UpdatableSharedFeedGrid from "./UpdatableSharedFeedGrid";

export default async function SharedBookmarks() {
  const session = await getServerAuthSession();
  if (!session) {
    redirect("/");
  }

  const bookmarks = await api.bookmarks.getSharedFeed({});

  return <UpdatableSharedFeedGrid initialBookmarks={bookmarks} />;
}
