import { isPathLens, lensFromPath, optionalFromPath } from "./monocle"
import type { Paths, BuildObj, AtPath } from "./types"

export const set = <
  Infer,
  Path extends 
    Paths<Infer> extends readonly (string | number | readonly string[])[]
      ? Paths<Infer>
      : never,
  Val extends AtPath<Infer, Path>
>(path: [...Path], val: Val) => 
  (obj: Infer) => {
  if (isPathLens(path)) {
    return lensFromPath(path)
      .set(val)(obj) as Infer
  }
  return optionalFromPath(path)
    .set(val)(obj) as Infer
}