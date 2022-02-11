import * as B from "fp-ts/boolean";
import { registerInstance } from "../typeclasses/Monoid";

declare module "../typeclasses/Monoid" {
  interface ExtractInstanceTypes<A> {
    All: A extends boolean ? boolean : never;
    Any: A extends boolean ? boolean : never;
  }
}

registerInstance("All", B.MonoidAll);
registerInstance("Any", B.MonoidAny);
