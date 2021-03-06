import { Monad, Monad1, Monad2, Monad3, Monad4 } from "fp-ts/Monad";
import { URIS, URIS2, URIS3, URIS4, HKT, Kind, Kind2, Kind3, Kind4 } from "fp-ts/HKT";
import { AllNonNeverKeys, throwMissingInstance } from "./internal";

export interface ExtractInstanceTypes<A> {}

export type GetInstances<A> = AllNonNeverKeys<ExtractInstanceTypes<A>>;

export type Instance = keyof ExtractInstanceTypes<unknown>;

type MonadForInstance<K> = K extends URIS
  ? Monad1<K>
  : K extends URIS2
  ? Monad2<K>
  : K extends URIS3
  ? Monad3<K>
  : K extends URIS4
  ? Monad4<K>
  : never;

export const instances = {} as {
  [K in Instance]: MonadForInstance<K>;
};

export const registerInstance = <I extends Instance>(name: I, m: MonadForInstance<I>) => {
  instances[name] = m as never;
};

export const getInstance = <F>(name: Instance): Monad<F> => {
  return (instances[name] as any) ?? throwMissingInstance("Monad", name);
};

export function chain<
  H extends Kind4<URIS4, unknown, unknown, unknown, unknown>,
  H2 extends Kind4<F, unknown, unknown, unknown, unknown>,
  F extends GetInstances<H> extends URIS3 ? GetInstances<H> : never,
  S extends ExtractInstanceTypes<H>[F][0],
  R extends ExtractInstanceTypes<H>[F][1],
  E extends ExtractInstanceTypes<H>[F][2],
  A extends ExtractInstanceTypes<H>[F][3],
  B extends ExtractInstanceTypes<H2>[F][3]
>(F: F, f: (a: A) => H2): (kind: H) => Kind4<F, S, R, E, B>;
export function chain<
  H extends Kind3<URIS3, unknown, unknown, unknown>,
  H2 extends Kind3<F, unknown, unknown, unknown>,
  F extends GetInstances<H> extends URIS3 ? GetInstances<H> : never,
  R extends ExtractInstanceTypes<H>[F][0],
  E extends ExtractInstanceTypes<H>[F][1],
  A extends ExtractInstanceTypes<H>[F][2],
  B extends ExtractInstanceTypes<H2>[F][2]
>(F: F, f: (a: A) => H2): (kind: H) => Kind3<F, R, E, B>;
export function chain<
  H extends Kind3<URIS3, unknown, unknown, unknown>,
  H2 extends Kind3<F, unknown, unknown, unknown>,
  F extends GetInstances<H> extends URIS3 ? GetInstances<H> : never,
  R extends ExtractInstanceTypes<H>[F][0],
  E extends ExtractInstanceTypes<H>[F][1],
  A extends ExtractInstanceTypes<H>[F][2],
  B extends ExtractInstanceTypes<H2>[F][2]
>(F: F, f: (a: A) => H2): (kind: H) => Kind3<F, R, E, B>;
export function chain<
  H extends Kind2<URIS2, unknown, unknown>,
  H2 extends Kind2<F, unknown, unknown>,
  F extends GetInstances<H> extends URIS2 ? GetInstances<H> : never,
  E extends ExtractInstanceTypes<H>[F][0],
  A extends ExtractInstanceTypes<H>[F][1],
  B extends ExtractInstanceTypes<H2>[F][1]
>(F: F, f: (a: A) => H2): (kind: H) => Kind2<F, E, B>;
export function chain<
  H extends Kind2<URIS2, unknown, unknown>,
  H2 extends Kind2<F, unknown, unknown>,
  F extends GetInstances<H> extends URIS2 ? GetInstances<H> : never,
  E extends ExtractInstanceTypes<H>[F][0],
  A extends ExtractInstanceTypes<H>[F][1],
  B extends ExtractInstanceTypes<H2>[F][1]
>(F: F, f: (a: A) => H2): (kind: H) => Kind2<F, E, B>;
export function chain<
  H extends Kind<URIS, unknown>,
  H2 extends Kind<F, unknown>,
  F extends GetInstances<H> extends URIS ? GetInstances<H> : never,
  A extends ExtractInstanceTypes<H>[F][0],
  B extends ExtractInstanceTypes<H2>[F][0]
>(F: F, f: (a: A) => H2): (kind: H) => Kind<F, B>;
export function chain<
  H extends HKT<string, unknown>,
  H2 extends HKT<F, unknown>,
  F extends GetInstances<H>,
  A extends ExtractInstanceTypes<H>[F][0],
  B extends ExtractInstanceTypes<H2>[F][0]
>(F: F, f: (a: A) => H2): (kind: H) => HKT<F, B>;
export function chain<
  H extends HKT<string, unknown>,
  H2 extends HKT<F, unknown>,
  F extends GetInstances<H>,
  A extends ExtractInstanceTypes<H>[F][0],
  B extends ExtractInstanceTypes<H2>[F][0]
>(F: F, f: (a: A) => H2): (kind: H) => HKT<F, B> {
  return (fa) => getInstance<F>(F).chain(fa as unknown as HKT<F, A>, f as (a: A) => HKT<F, B>);
}
