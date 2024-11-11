export const REOWN_PROJECT_ID = process.env.VITE_REOWN_PROJECT_ID!;

if (!REOWN_PROJECT_ID) {
  throw new Error("REOWN_PROJECT_ID is not set");
}
