import * as M from "fp-ts/Monoid";
import * as B from "fp-ts/boolean";
import { registerInstance } from "./Monoid";

declare module "./Monoid" {
  interface ExtractInstances<A> {
    all: A extends boolean ? boolean : never;
    any: A extends boolean ? boolean : never;
  }
}

registerInstance("all", B.MonoidAll);
registerInstance("any", B.MonoidAny);

export const one = 1;
