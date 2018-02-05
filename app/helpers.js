export const validate = (fields, errorProperties, acceptEmpty = true) => {
  const errors = errorProperties.reduce((errors, row) => {
    if(!fields.hasOwnProperty(row.field) || (!acceptEmpty && fields[row.field].length < 1))
      return [...errors, row.message]
    return errors
  }, [])

  return {
    isValid: errors.length == 0,
    errors
  }
}
