import * as O from "fp-ts/Option";
import { registerInstance } from "../typeclasses/Monad";

declare module "../typeclasses/Monad" {
  interface ExtractInstanceTypes<A> {
    readonly [O.URI]: [A] extends [O.Option<infer A>] ? [A] : never;
  }
}

registerInstance(O.URI, O.Monad);
