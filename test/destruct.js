import { destructFunction } from '../src/lib';

test('thing', t => {
  let i = 0;

  const fn = destructFunction(2)(() => {
    i++;
  });

  for (let i = 0; i < 100; i++) {
    fn();
  }

  t.equal(i, 2);

  t.end();
});
