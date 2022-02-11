export type AllNonNeverKeys<A> = keyof {
  [K in keyof A as A[K] extends never ? never : K]: unknown;
};
