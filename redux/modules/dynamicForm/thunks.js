import jivaAPI from "@api/index";
import { setSchemas } from "@redux/modules/dynamicForm";
import { toast } from "react-toastify";
import { capitalize } from "@utils/index";

const getSchemas = ({ idCabang }) => {
    return async (dispatch) => {
        try {
            const { data } = await jivaAPI.dynamicForm.getSchema({ idCabang });
            await dispatch(setSchemas(data));
        } catch (error) {
            console.log(error);
        }
    };
};

const updateSchema = (schema) => {
    return async (dispatch, getState) => {
        try {
            const { data : updatedSchema } = await jivaAPI.dynamicForm.updateSchema(schema)
            const { schemas } = getState().dynamicForm
            
            const updatedSchemas = schemas.map((schema) => (schema.id === updatedSchema.id ? updatedSchema : schema))
            await dispatch(setSchemas(updatedSchemas))
        } catch (error) {
            console.log(error);
        }
    };
};

const createSchema = ({ idCabang, formType, formFields }) => {
    return async () => {
        try {
            await jivaAPI.dynamicForm.createSchema({ idCabang, formType, formFields });
        } catch (error) {
            let errorMessage = "Terjadi kesalahan 😥";
            if (error?.response?.status === 400 && error?.response?.data) {
                const message = error.response.data?.account?.email[0];
                if (message) errorMessage = capitalize(message);
            }
            toast(errorMessage, { type: toast.TYPE.ERROR });
        }
    };
};

const deleteSchemaByID = ({ idSchema }) => {
    return async () => {
        try {
            await jivaAPI.dynamicForm.deleteSchemaByID({ idSchema })
        } catch {
            console.log(error);
        }
    };
};

export { getSchemas, updateSchema, createSchema, deleteSchemaByID }