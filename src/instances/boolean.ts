import * as B from "fp-ts/boolean";
import { registerInstance } from "../typeclasses/Monoid";

declare module "../typeclasses/Monoid" {
  interface ExtractInstanceTypes {
    All: boolean;
    Any: boolean;
  }
}

registerInstance("All", B.MonoidAll);
registerInstance("Any", B.MonoidAny);
