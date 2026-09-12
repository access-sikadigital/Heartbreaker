# Studio photography

> **Audit of `../placeholder-*.jpg`, 12 Sep 2026.** That set is a designer's
> mood board, not a photo library. Only five frames show clean fine line work:
> **07, 08, 09, 10, 13** — all now in use (07/08/10 as location heroes, 09 and
> 13 in the gallery, 13 also in the homepage process strip).
>
> **Do not use** 02, 04, 05, 06, 11, 12, 14, 15, 16: blurred fashion reference
> with no tattoo in frame. **01 shows good work but has Instagram's "1/3"
> carousel badge burnt into the corner** — re-export it from the original post
> and it becomes usable. 03 is a client selfie rather than a work shot.
>
> None of the set is verified as the studio's own photography. Worth
> confirming with Beth before launch, and worth replacing outright once her
> originals arrive.

Photographs of the artist, from the studio's own shoot (Drive → "EDITED",
supplied 12 Sep 2026).

## What belongs here

Three files, named exactly as the camera named them:

- `DSC_5025.jpg` — three-quarter length, sunglasses, hands at the collar
- `DSC_5087.jpg` — full length, leaning, laughing
- `DSC_5100.jpg` — full length, walking, in profile

Do not rename them. `src/data/studio-photos.ts` maps these filenames to
semantic names (`artist.portrait`, `artist.leaning`, `artist.walking`) and the
pages read from there, so the tidy names already exist in one place. Renaming
the files only creates a second place to get it wrong.

## Where they are used

- `DSC_5100.jpg` — the `/about/` page hero. The hero scrim clears toward the
  right, so a subject standing off-centre survives it.
- `DSC_5025.jpg` — the arch-framed portrait on `/about/`. This slot previously
  held `placeholder-05.jpg`, an unlicensed stock photograph of someone who is
  not the artist, on the page whose job is introducing her.
- `DSC_5087.jpg` — mapped and ready, not yet placed. The homepage intro
  section is the obvious home.

## Not yet confirmed

The same shoot contains a second look — dark hair, black blazer, same backdrop
— in frames 4704, 4707, 4720, 4816 and 4841. Almost certainly the same person,
but the outfit differs from the reference, so none of them are wired in until
the client confirms.

The folder also contains a second person entirely (blonde, denim jacket, red
top): frames 4291, 4317, 4322, 4379, 4468, 4474, 4665, 5105, 5115, plus 4420,
4874, 5007 and 5022 where both appear. None of those belong on this site.

## Sizing

No manual resizing needed. `next/image` serves AVIF/WebP at the widths declared
in `next.config.ts`, so the ~1MB originals are the right thing to commit.
