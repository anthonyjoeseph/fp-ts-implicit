import * as E from "fp-ts/Either";
import { registerInstance } from "../typeclasses/Monad";

declare module "../typeclasses/Monad" {
  interface ExtractInstanceTypes<A> {
    readonly [E.URI]: [A] extends [E.Either<infer E, infer A>] ? [E, A] : never;
  }
}

registerInstance(E.URI, E.Monad);
