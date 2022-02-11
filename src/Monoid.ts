import { Monoid, concatAll as ca } from "fp-ts/Monoid";

export interface ExtractInstances<A> {}

export type GetInstances<A> = keyof {
  [K in keyof ExtractInstances<A> as ExtractInstances<A>[K] extends never ? never : K]: unknown;
};

export type Instance = keyof ExtractInstances<unknown>;

export const instances = {} as Record<Instance, Monoid<any>>;

export const registerInstance = (name: Instance, m: Monoid<any>) => {
  instances[name] = m;
};

export const getInstance = <I extends Instance>(name: I): Monoid<ExtractInstances<any>[I]> => {
  return instances[name];
};

export const concatAll =
  <A>(m: GetInstances<A>) =>
  (a: A[]) =>
    ca(getInstance(m) as Monoid<any>)(a);
