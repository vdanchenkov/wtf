import { enumerateModules } from '../src/lib'

test('enumerateModules', t => {
  t.plan(5)
  const a = new Function()
  const b = new Function()
  const result = enumerateModules({ libname: { a, b } })
  t.ok(Array.isArray(result))
  t.equal(result[0].func, a)
  t.equal(result[0].display(1), 'libname.a(1)')
  t.equal(result[1].func, b)
  t.equal(result[1].display(1), 'libname.b(1)')
})
