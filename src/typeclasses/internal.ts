export type AllNonNeverKeys<A> = keyof {
  [K in keyof A as A[K] extends never ? never : K]: unknown;
};

export type AllExtendingKeys<E, A> = keyof {
  [K in keyof E as E[K] extends A ? K : never]: unknown;
};

export const throwMissingInstance = (typeclassName: string, instanceName: string): never => {
  throw new Error(`Missing ${typeclassName} instance for ${instanceName}`);
};
