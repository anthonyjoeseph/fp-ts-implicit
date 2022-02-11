import { Monoid, concatAll as ca } from "fp-ts/Monoid";
import { AllExtendingKeys } from "./internal";

export interface ExtractInstanceTypes {}

export type GetInstances<A> = AllExtendingKeys<ExtractInstanceTypes, A>;

export type Instance = keyof ExtractInstanceTypes;

export const instances = {} as {
  [K in Instance]: Monoid<ExtractInstanceTypes[K]>;
};

export const registerInstance = <I extends Instance>(name: I, m: Monoid<ExtractInstanceTypes[I]>) => {
  instances[name] = m as never;
};

export const getInstance = <A>(name: Instance): Monoid<A> => {
  return instances[name] as any;
};

export const concatAll =
  <A>(m: GetInstances<A>) =>
  (a: A[]) =>
    ca(getInstance<A>(m))(a);
