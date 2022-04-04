import jivaAPI from "@api/index";
import { setSchemas } from "@redux/modules/dynamicForm";
import { toast } from "react-toastify";
import { capitalize } from "@utils/index";
import constants from "@utils/constants";

const formTypes = [
    constants.FORM_TYPES.PATIENT_APPLICATION
]

const getSchemas = ({ idCabang }) => {
    return async (dispatch) => {
        try {
            let { data } = await jivaAPI.dynamicForm.getSchema({ idCabang });
            if (!isSchemasInitiated(data)) {
                await initSchemas(idCabang)
            }
            await dispatch(setSchemas(data));
        } catch (error) {
            console.log(error);
        }
    };
};

const updateSchema = (payload) => {
    return async (dispatch, getState) => {
        try {
            const { data : updatedSchema } = await jivaAPI.dynamicForm.updateSchema(payload)
            const { schemas } = getState().dynamicForm
            
            const updatedSchemas = schemas.map((schema) => (schema.id === updatedSchema.id ? updatedSchema : schema))
            await dispatch(setSchemas(updatedSchemas))
            toast("Perubahan berhasil disimpan", { type: toast.TYPE.SUCCESS });
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
        } catch (error) {
            console.log(error);
        }
    };
};

async function initSchemas(idCabang) {
    const schemas = []
    try {
        formTypes.forEach( async (formType) => {
            const { data } = await jivaAPI.dynamicForm.createSchema({ 
                idCabang: idCabang, 
                formType: formType, 
                formFields: [] 
            })
            schemas.push(data)
        })
        return schemas
    } catch (error) {
        console.log(error)
    }
}

function isSchemasInitiated(schemas) {
    return formTypes.every(formtype => schemas.map(schema => schema.formtype).includes(formtype));
}

export { getSchemas, updateSchema, createSchema, deleteSchemaByID }