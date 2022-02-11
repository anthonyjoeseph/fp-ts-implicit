import * as monoid from "./typeclasses/Monoid";
import * as semigroup from "./typeclasses/Semigroup";
import * as magma from "./typeclasses/Magma";
import * as monad from "./typeclasses/Monad";
import * as functor from "./typeclasses/Functor";

export { monoid, semigroup, magma, monad, functor };

export const allInstances = ["boolean", "number", "string", "Either", "Option"] as const;

export const importInstances = (...instances: typeof allInstances[number][]) =>
  instances.map((x) => import(`./instances/${x as string}`));
