import { Semigroup, concatAll as ca } from "fp-ts/Semigroup";
import { AllExtendingKeys } from "./internal";
import { ExtractInstanceTypes as ExtractMonoidInstances, getInstance as getMonoidInstance } from "./Monoid";

export interface ExtractInstanceTypes extends ExtractMonoidInstances {}

export type GetInstances<A> = AllExtendingKeys<ExtractInstanceTypes, A>;

export type Instance = keyof ExtractInstanceTypes;

const instances = {} as {
  [K in Instance]: Semigroup<ExtractInstanceTypes[K]>;
};

export const registerInstance = <I extends Instance>(name: I, m: Semigroup<ExtractInstanceTypes[I]>) => {
  instances[name] = m as never;
};

export const getInstance = <A>(name: Instance): Semigroup<A> => {
  return (instances[name] as any) ?? getMonoidInstance<A>(name);
};

export const concatAll =
  <A>(s: GetInstances<A>, startWith: A) =>
  (a: A[]) =>
    ca(getInstance<A>(s))(startWith)(a);
