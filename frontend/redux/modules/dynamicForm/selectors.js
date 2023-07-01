export const findSchema = (state, formType) => {
    const { schemas } = state.dynamicForm
    const result = schemas?.find(schema => schema.formtype === formType) 
    return result
}