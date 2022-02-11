import { Magma, concatAll as ca } from "fp-ts/Magma";
import { AllNonNeverKeys } from "./internal";
import { ExtractInstanceTypes as ExtractSemigroupInstances, getInstance as getSemigroupInstance } from "./Semigroup";

export interface ExtractInstanceTypes<A> extends ExtractSemigroupInstances<A> {}

export type GetInstances<A> = AllNonNeverKeys<ExtractInstanceTypes<A>>;

export type Instance = keyof ExtractInstanceTypes<unknown>;

const instances = {} as {
  [K in Instance]: Magma<ExtractInstanceTypes<any>[K]>;
};

export const registerInstance = <I extends Instance>(name: I, m: Magma<ExtractInstanceTypes<any>[I]>) => {
  instances[name] = m as never;
};

export const getInstance = <I extends Instance>(name: I) => {
  return instances[name] ?? getSemigroupInstance(name);
};

export const concatAll =
  <A>(s: GetInstances<A>, startWith: A) =>
  (a: A[]) =>
    ca(getInstance(s) as Magma<unknown>)(startWith)(a);
