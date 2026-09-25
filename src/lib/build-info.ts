/** The UTC day of this build. Freshness labels are computed against it, so a rebuild keeps them honest. */
export const BUILD_DAY = new Date().toISOString().slice(0, 10);
export const BUILD_NOW = new Date(`${BUILD_DAY}T00:00:00Z`);
