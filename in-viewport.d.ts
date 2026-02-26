/**
 * The single-argument call with body as container is the only recommended one.
 * All other can invoke unnecessary code from MutationObserver or failsafe setInterval
 */
declare const inViewport: (node: Element) => boolean;

export default inViewport;