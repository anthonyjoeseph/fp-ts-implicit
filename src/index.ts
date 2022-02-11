import * as M from "./Monoid";
import * as S from "./Semigroup";
import * as Ma from "./Magma";
import * as N from "./number";
import * as St from "./string";
import * as B from "./boolean";

const unused = { ...N, ...St, ...B };

export { M as monoid, S as semigroup, Ma as magma };
