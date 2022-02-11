import { Semigroup, concatAll as ca } from "fp-ts/Semigroup";
import { ExtractInstances as ExtractMonoidInstances, getInstance as getMonoidInstance } from "./Monoid";

export interface ExtractInstances<A> extends ExtractMonoidInstances<A> {}

export type GetInstances<A> = keyof {
  [K in keyof ExtractInstances<A> as ExtractInstances<A>[K] extends never ? never : K]: unknown;
};

export type Instance = keyof ExtractInstances<unknown>;

const instances = {} as Record<Instance, Semigroup<any>>;

export const registerInstance = (name: Instance, m: Semigroup<any>) => {
  instances[name] = m;
};

export const getInstance = <I extends Instance>(name: I): Semigroup<ExtractInstances<any>[I]> => {
  return instances[name] ?? getMonoidInstance(name);
};

export const concatAll =
  <A>(s: GetInstances<A>, startWith: A) =>
  (a: A[]) =>
    ca(getInstance(s) as Semigroup<any>)(startWith)(a);
