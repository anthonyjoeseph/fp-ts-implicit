import { Magma, concatAll as ca } from "fp-ts/Magma";
import { AllExtendingKeys, throwMissingInstance } from "./internal";
import { ExtractInstanceTypes as ExtractSemigroupInstances, getInstance as getSemigroupInstance } from "./Semigroup";

export interface ExtractInstanceTypes extends ExtractSemigroupInstances {}

export type GetInstances<A> = AllExtendingKeys<ExtractInstanceTypes, A>;

export type Instance = keyof ExtractInstanceTypes;

const instances = {} as {
  [K in Instance]: Magma<ExtractInstanceTypes[K]>;
};

export const registerInstance = <I extends Instance>(name: I, m: Magma<ExtractInstanceTypes[I]>) => {
  instances[name] = m as never;
};

export const getInstance = <A>(name: Instance): Magma<A> => {
  return (instances[name] as any) ?? getSemigroupInstance<A>(name) ?? throwMissingInstance("Magma", name);
};

export const concatAll =
  <A>(s: GetInstances<A>, startWith: A) =>
  (a: A[]) =>
    ca(getInstance<A>(s))(startWith)(a);
