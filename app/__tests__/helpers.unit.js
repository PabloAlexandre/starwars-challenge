import { validate } from 'app/helpers'

describe ('Test some helpers functions', () => {
  test('Check if validate function returns empty when required fields are present', () => {
    const validation = validate({a: 'A', b: 'B'}, [
      {field: 'a', message: 'Please Pass A Parameter'},
      {field: 'b', message: 'Please Pass B Parameter'},
    ])
    expect(validation.isValid).toBe(true)
    expect(validation.errors).toHaveLength(0)
  })

  test('Check if validate function returns invalid when required fields are missing', () => {
    const validation = validate({b: 'B'}, [
      {field: 'a', message: 'Please Pass A Parameter'},
      {field: 'b', message: 'Please Pass B Parameter'},
    ], false)
    expect(validation.isValid).toBe(false)
    expect(validation.errors).toHaveLength(1)
  })

  test('Check if validate function returns valid when required fields are empty and accept empty values', () => {
    const validation = validate({a: '', b: 'B'}, [
      {field: 'a', message: 'Please Pass A Parameter'},
      {field: 'b', message: 'Please Pass B Parameter'},
    ], true)
    expect(validation.isValid).toBe(true)
    expect(validation.errors).toHaveLength(0)
  })

  test('Check if validate function returns invalid when required fields are empty and not accept empty values', () => {
    const validation = validate({a: '', b: 'B'}, [
      {field: 'a', message: 'Please Pass A Parameter'},
      {field: 'b', message: 'Please Pass B Parameter'},
    ], false)
    expect(validation.isValid).toBe(false)
    expect(validation.errors).toHaveLength(1)
  })
})
