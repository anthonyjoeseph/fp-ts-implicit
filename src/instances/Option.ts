import * as O from "fp-ts/Option";
import { pipe } from "fp-ts/function";
import { Functor } from "fp-ts/Functor";
import { registerInstance } from "../typeclasses/Monad";

declare module "../typeclasses/Monad" {
  interface ExtractInstanceTypes<A> {
    readonly [O.URI]: [A] extends [O.Option<infer A>] ? [A] : never;
  }
}

registerInstance(O.URI, O.Monad);
