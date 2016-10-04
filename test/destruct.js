import { destructFunction } from '../src/lib';

test('thing', t => {
  t.plan(2)
  let i = 0;

  const fn = destructFunction(2)(() => {
    i++;
  });

  try {
    for (let i = 0; i < 100; i++) {
      fn();
    }
  } catch  (e) {
    t.pass('throwed')
  }

  t.equal(i, 2);
});
