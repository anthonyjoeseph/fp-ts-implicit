import { Monoid, concatAll as ca } from "fp-ts/Monoid";
import { AllNonNeverKeys } from "./internal";

export interface ExtractInstanceTypes<A> {}

export type GetInstances<A> = AllNonNeverKeys<ExtractInstanceTypes<A>>;

export type Instance = keyof ExtractInstanceTypes<unknown>;

export const instances = {} as {
  [K in Instance]: Monoid<ExtractInstanceTypes<any>[K]>;
};

export const registerInstance = <I extends Instance>(name: I, m: Monoid<ExtractInstanceTypes<any>[I]>) => {
  instances[name] = m as never;
};

export const getInstance = <I extends Instance>(name: I) => {
  return instances[name];
};

export const concatAll =
  <A>(m: GetInstances<A>) =>
  (a: A[]) =>
    ca(getInstance(m) as Monoid<unknown>)(a);
