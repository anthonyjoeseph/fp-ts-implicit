import { Semigroup, concatAll as ca } from "fp-ts/Semigroup";
import { AllNonNeverKeys } from "./internal";
import { ExtractInstanceTypes as ExtractMonoidInstances, getInstance as getMonoidInstance } from "./Monoid";

export interface ExtractInstanceTypes<A> extends ExtractMonoidInstances<A> {}

export type GetInstances<A> = AllNonNeverKeys<ExtractInstanceTypes<A>>;

export type Instance = keyof ExtractInstanceTypes<unknown>;

const instances = {} as {
  [K in Instance]: Semigroup<ExtractInstanceTypes<any>[K]>;
};

export const registerInstance = <I extends Instance>(name: I, m: Semigroup<ExtractInstanceTypes<any>[I]>) => {
  instances[name] = m as never;
};

export const getInstance = <A>(name: Instance): Semigroup<A> => {
  return (instances[name] as any) ?? getMonoidInstance<A>(name);
};

export const concatAll =
  <A>(s: GetInstances<A>, startWith: A) =>
  (a: A[]) =>
    ca(getInstance<A>(s))(startWith)(a);
