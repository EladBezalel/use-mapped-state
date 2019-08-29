<div align="center">
  <h1>
    <br/>
    🗺️
    <br />
    use-mapped-state    
  </h1>  
  <br />
  <pre>yarn add <a href="https://www.npmjs.com/package/use-mapped-state">use-mapped-state</a></pre>
  <br />

A React hook for mapping state on each state change
<br />
<br />
<br />
<img src="https://user-images.githubusercontent.com/6004537/63941774-f5c73100-ca74-11e9-8fc0-920ea734e7ca.png" />
</div>

## Usage

```tsx
import useMappedState from 'use-mapped-state';

const Comp = () => {
  const [state, setState, [value1, yoValue]] = useMappedState(
    'initialValue',
    value => value + 1,
    value => 'Yo' + value
  );

  return (
    <div>
      <span>{state}</span>
      <span>{value1}</span>
      <span>{yoValue}</span>
      <button onClick={() => setState('Cool')} />
    </div>
  );
};

export default Comp;
```

### Typings

The cool thing about this hook is that you get a typed return value of your map functions

```tsx
const [
  num, // number
  setNum, // Dispatch..
  [
    value1, // number
    value2, // string
    value3, // object
  ],
] = useMappedState(1, value => value + 1, value => 'Yo' + value, value => ({ value }));
```
