/**
 * Page du fil partagé.
 * Affiche les bookmarks non archivés de tous les utilisateurs avec leur auteur.
 */

import SharedBookmarks from "@/components/dashboard/bookmarks/SharedBookmarks";

export default async function SharedFeedPage() {
  return (
    <div>
      <SharedBookmarks />
    </div>
  );
}
