import * as monoid from "./typeclasses/Monoid";
import * as semigroup from "./typeclasses/Semigroup";
import * as magma from "./typeclasses/Magma";
import * as monad from "./typeclasses/Monad";
import * as functor from "./typeclasses/Functor";

import * as number from "./instances/number";
import * as string from "./instances/string";
import * as boolean from "./instances/boolean";
import * as option from "./instances/Option";
import * as either from "./instances/Either";

const runRegisterInstances = { ...number, ...string, ...boolean, ...option, ...either };

export { monoid, semigroup, magma, monad, functor };
