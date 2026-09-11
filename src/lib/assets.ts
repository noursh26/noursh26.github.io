/* The films are the only assets the gate does not wait for, and they are not
   even started until it opens.

   Each sits behind a still of the same shot at 32% opacity under a heavy
   scrim, so a film that arrives late fades up rather than pops — nothing on
   the page is missing while it loads. They are also 18 of the site's 26 MB,
   and letting them compete with the pictures for bandwidth turned an
   eight-second load into ninety on a live GitHub Pages test.

   To hold the door for them too, await them in preloadAll before the fonts. */
const DEFERRED_PATHS: string[] = []

const resolve = (path: string) => new URL(path, document.baseURI).href

/** Fetched alongside, but never waited on. */
export const DEFERRED: string[] = DEFERRED_PATHS.map(resolve)

export const FONT_FACES = [
  '400 1rem "Manrope"',
  '600 1rem "Manrope"',
  '700 1rem "Manrope"',
  '400 1rem "Alexandria"',
  '600 1rem "Alexandria"',
  '700 1rem "Alexandria"',
  '800 1rem "Alexandria"',
]
