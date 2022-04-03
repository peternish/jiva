import auth from "./endpoints/auth";
import klinik from "./endpoints/klinik";
import cabang from "./endpoints/cabang";
import pengaturanPengguna from "./endpoints/pengaturanPengguna";
import tenagaMedis from "./endpoints/tenagaMedis";
import dynamicForm from "./endpoints/dynamicForm";
import jadwalTenagaMedis from "./endpoints/jadwalTenagaMedis";

const api = {
  auth,
  klinik,
  cabang,
  pengaturanPengguna,
  tenagaMedis,
  dynamicForm,
  jadwalTenagaMedis
};

export default api;
