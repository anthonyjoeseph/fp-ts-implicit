import { Functor, Functor1, Functor2, Functor3, Functor4 } from "fp-ts/Functor";
import { URIS, URIS2, URIS3, URIS4, HKT, Kind, Kind2, Kind3, Kind4 } from "fp-ts/HKT";
import { ExtractInstanceTypes as ExtractMonadInstanceTypes, getInstance as getMonadInstance } from "./Monad";
import { AllNonNeverKeys } from "./internal";

export interface ExtractInstanceTypes<A> extends ExtractMonadInstanceTypes<A> {}

export type GetInstances<A> = AllNonNeverKeys<ExtractInstanceTypes<A>>;

export type Instance = keyof ExtractInstanceTypes<unknown>;

type FunctorForInstance<K> = K extends URIS
  ? Functor1<K>
  : K extends URIS2
  ? Functor2<K>
  : K extends URIS3
  ? Functor3<K>
  : K extends URIS4
  ? Functor4<K>
  : never;

export const instances = {} as {
  [K in Instance]: FunctorForInstance<K>;
};

export const registerInstance = <I extends Instance>(name: I, m: FunctorForInstance<I>) => {
  instances[name] = m as never;
};

export const getInstance = <F>(name: Instance): Functor<F> => {
  const functorInstance = instances[name];
  if (functorInstance) return functorInstance as any;
  const monadInstance = getMonadInstance<F>(name);
  return {
    URI: name as unknown as F,
    map: (fa, f) => monadInstance.chain(fa, (a) => monadInstance.of(f(a))),
  };
};

export function map<
  H extends Kind4<URIS4, unknown, unknown, unknown, unknown>,
  F extends GetInstances<H> extends URIS3 ? GetInstances<H> : never,
  S extends ExtractInstanceTypes<H>[F][0],
  R extends ExtractInstanceTypes<H>[F][1],
  E extends ExtractInstanceTypes<H>[F][2],
  A extends ExtractInstanceTypes<H>[F][3],
  B
>(F: F, f: (a: A) => B): (kind: H) => Kind4<F, S, R, E, B>;
export function map<
  H extends Kind3<URIS3, unknown, unknown, unknown>,
  F extends GetInstances<H> extends URIS3 ? GetInstances<H> : never,
  R extends ExtractInstanceTypes<H>[F][0],
  E extends ExtractInstanceTypes<H>[F][1],
  A extends ExtractInstanceTypes<H>[F][2],
  B
>(F: F, f: (a: A) => B): (kind: H) => Kind3<F, R, E, B>;
export function map<
  H extends Kind3<URIS3, unknown, unknown, unknown>,
  F extends GetInstances<H> extends URIS3 ? GetInstances<H> : never,
  R extends ExtractInstanceTypes<H>[F][0],
  E extends ExtractInstanceTypes<H>[F][1],
  A extends ExtractInstanceTypes<H>[F][2],
  B
>(F: F, f: (a: A) => B): (kind: H) => Kind3<F, R, E, B>;
export function map<
  H extends Kind2<URIS2, unknown, unknown>,
  F extends GetInstances<H> extends URIS2 ? GetInstances<H> : never,
  E extends ExtractInstanceTypes<H>[F][0],
  A extends ExtractInstanceTypes<H>[F][1],
  B
>(F: F, f: (a: A) => B): (kind: H) => Kind2<F, E, B>;
export function map<
  H extends Kind2<URIS2, unknown, unknown>,
  F extends GetInstances<H> extends URIS2 ? GetInstances<H> : never,
  E extends ExtractInstanceTypes<H>[F][0],
  A extends ExtractInstanceTypes<H>[F][1],
  B
>(F: F, f: (a: A) => B): (kind: H) => Kind2<F, E, B>;
export function map<
  H extends Kind<URIS, unknown>,
  F extends GetInstances<H> extends URIS ? GetInstances<H> : never,
  A extends ExtractInstanceTypes<H>[F][0],
  B
>(F: F, f: (a: A) => B): (kind: H) => Kind<F, B>;
export function map<
  H extends HKT<string, unknown>,
  F extends GetInstances<H>,
  A extends ExtractInstanceTypes<H>[F][0],
  B
>(F: F, f: (a: A) => B): (kind: H) => HKT<F, B>;
export function map<
  H extends HKT<string, unknown>,
  F extends GetInstances<H>,
  A extends ExtractInstanceTypes<H>[F][0],
  B
>(F: F, f: (a: A) => B): (kind: H) => HKT<F, B> {
  return (fa) => getInstance<F>(F).map(fa as unknown as HKT<F, A>, f);
}
