import auth from "./endpoints/auth";
import klinik from "./endpoints/klinik";
import cabang from "./endpoints/cabang";
import pengaturanPengguna from "./endpoints/pengaturanPengguna";
import tenagaMedis from "./endpoints/tenagaMedis";
import dynamicForm from "./endpoints/dynamicForm";
import jadwalTenagaMedis from "./endpoints/jadwalTenagaMedis";
import patientApplication from "./endpoints/patientApplication";

const api = {
  auth,
  klinik,
  cabang,
  pengaturanPengguna,
  tenagaMedis,
  dynamicForm,
  jadwalTenagaMedis,
  patientApplication
};

export default api;
