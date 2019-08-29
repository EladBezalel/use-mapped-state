import { useMemo, useState, Dispatch, SetStateAction } from 'react';

type StateMapFunc<S> = (state: S) => any;

type MapResults<S, M> = {
  [K in keyof M]: M[K] extends StateMapFunc<S> ? ReturnType<M[K]> : never;
};

function useMappedState<S, M extends StateMapFunc<S>[]>(
  initialState: S | (() => S),
  ...mapFns: M
): [S, Dispatch<SetStateAction<S>>, MapResults<S, M>] {
  const [state, setState] = useState<S>(initialState);

  const memo = useMemo(() => mapFns.map(mapFn => mapFn(state)), [state]) as MapResults<S, M>;

  return [state, setState, memo];
}

export default useMappedState;
