import { Magma, concatAll as ca } from "fp-ts/Magma";
import { ExtractInstances as ExtractSemigroupInstances, getInstance as getSemigroupInstance } from "./Semigroup";

export interface ExtractInstances<A> extends ExtractSemigroupInstances<A> {}

export type GetInstances<A> = keyof {
  [K in keyof ExtractInstances<A> as ExtractInstances<A>[K] extends never ? never : K]: unknown;
};

export type Instance = keyof ExtractInstances<unknown>;

const instances = {} as Record<Instance, Magma<any>>;

export const registerInstance = (name: Instance, m: Magma<any>) => {
  instances[name] = m;
};

export const getInstance = <I extends Instance>(name: I): Magma<ExtractInstances<any>[I]> => {
  return instances[name] ?? getSemigroupInstance(name);
};

export const concatAll =
  <A>(s: GetInstances<A>, startWith: A) =>
  (a: A[]) =>
    ca(getInstance(s) as Magma<any>)(startWith)(a);
