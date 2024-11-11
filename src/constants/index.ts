export const REOWN_PROJECT_ID = import.meta.env.VITE_REOWN_PROJECT_ID;

if (!REOWN_PROJECT_ID) {
  throw new Error("REOWN_PROJECT_ID is not set");
}
