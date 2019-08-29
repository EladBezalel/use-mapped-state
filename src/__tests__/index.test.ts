import { act, renderHook } from '@testing-library/react-hooks';
import useMappedState from '../';

it('should map one value', () => {
  const initialState = 2;
  const isEvenFunction = (value: number) => value % 2 === 0;

  const { result } = renderHook(() => useMappedState(initialState, isEvenFunction));

  expect(result.current[0]).toBe(initialState);
  expect(result.current[2][0]).toBeTruthy();

  act(() => {
    result.current[1](3);
  });

  expect(result.current[0]).toBe(3);
  expect(result.current[2][0]).toBeFalsy();
});

it('should map multiple values', () => {
  const initialState = {};
  const numOfProperties = (value: object) => Object.keys(value).length;
  const hasProperty = (value: object) => Object.keys(value).includes('test');

  const { result } = renderHook(() => useMappedState(initialState, numOfProperties, hasProperty));

  expect(result.current[0]).toEqual(initialState);
  expect(result.current[2][0]).toBe(0);
  expect(result.current[2][1]).toBeFalsy();

  act(() => {
    result.current[1]({
      test: '',
    });
  });

  expect(result.current[0]).toEqual({
    test: '',
  });
  expect(result.current[2][0]).toBe(1);
  expect(result.current[2][1]).toBeTruthy();
});

it('should support async', async () => {
  const initialState = 0;
  const asyncCall = (value: number) => {
    return new Promise<string>(res => {
      setTimeout(() => res(value + 'success'), 500);
    });
  };

  const { result } = renderHook(() => useMappedState(initialState, asyncCall));

  expect(result.current[0]).toEqual(initialState);
  await expect(result.current[2][0]).resolves.toBe('0success');

  act(() => {
    result.current[1](1);
  });

  expect(result.current[0]).toEqual(1);
  await expect(result.current[2][0]).resolves.toBe('1success');
});
