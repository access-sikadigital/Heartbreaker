/**
 * Photographs of the artist, from the studio's own shoot.
 *
 * SOURCE: the "EDITED" folder in the client's Drive, supplied by John on
 * 12 Sep 2026. That folder holds 36 frames of TWO different people; these are
 * the ones matching the reference photo John sent, identified by the outfit
 * carried across the set (black leather bomber, light wide-leg jeans, grey
 * seamless backdrop) rather than by anything about the face.
 *
 * Filenames are the camera's originals on purpose. Renaming six files by hand
 * is six chances to introduce a typo that only shows up as a 404 in
 * production; dragging them in untouched has none. The semantic name lives
 * here instead, which is where the rest of the site reads them from anyway.
 *
 * DESTINATION: public/brand/photography/studio/
 *
 * These paths 404 until the files are dropped in. That is deliberate and
 * visible rather than silently falling back to a stock placeholder, which is
 * what the About page was doing before.
 */

const dir = "/brand/photography/studio";

export const artist = {
  /** Three-quarter length, sunglasses, hands at the collar. The portrait. */
  portrait: `${dir}/DSC_5025.jpg`,
  /** Full length, leaning back, laughing. Wide crops and feature bands. */
  leaning: `${dir}/DSC_5087.jpg`,
  /** Full length, walking, in profile. Tall slots and parallax columns. */
  walking: `${dir}/DSC_5100.jpg`,
} as const;

/**
 * Awaiting confirmation from John.
 *
 * A second look from the same shoot: dark hair, black blazer, same backdrop.
 * Almost certainly the same person, but the outfit differs from the reference
 * photo, so it is NOT wired into any page until he says so. Frames: 4704,
 * 4707, 4720, 4816, 4841.
 */
export const unconfirmed = ["DSC_4704", "DSC_4707", "DSC_4720", "DSC_4816", "DSC_4841"];
