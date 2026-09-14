/**
 * Site-wide motion switch.
 *
 * `false` turns off every animation on the site: GSAP scroll-triggered
 * reveals, the scrub-linked sections, Motion's enter/exit transitions, the
 * split-line text reveals, and Lenis smooth scrolling. Scrolling reverts to
 * the browser's own.
 *
 * WHY A FLAG RATHER THAN DELETING THE CODE
 *
 * Every animated component already guards on `prefersReducedMotion()`, and
 * `globals.css` already neutralises the CSS side for those visitors. That path
 * is written, tested and used. Forcing it on is one decision in one file;
 * stripping GSAP out of twenty-odd components is twenty chances to leave an
 * element stranded at `opacity: 0` with nothing left to animate it back.
 *
 * It also means this is reversible. Set it back to `true` and the site
 * animates exactly as it did before, with no code to reconstruct.
 *
 * The components stay in the bundle either way. That is the one real cost, and
 * it is small next to the risk of a half-removed animation system.
 */
export const MOTION_ENABLED = true;

/**
 * Lenis smooth scrolling, controlled separately from the animations above.
 *
 * These started as one switch and have been split, because they turned out to
 * be two different things: the animations are content moving on the page,
 * smooth scrolling is how the page responds to the wheel. Turning the first
 * off is a design decision; turning the second off changes the feel of the
 * whole site.
 *
 * A genuine reduced-motion preference still wins over this. Smooth scrolling
 * is one of the things that setting exists to switch off — it is a common
 * migraine and motion-sickness trigger — so a visitor who has asked for less
 * motion gets native scrolling regardless of what this says.
 */
export const SMOOTH_SCROLL_ENABLED = true;
