import auth from "./endpoints/auth";
import klinik from "./endpoints/klinik";
import cabang from "./endpoints/cabang";
import pengaturanPengguna from "./endpoints/pengaturanPengguna";
import tenagaMedis from "./endpoints/tenagaMedis";

const api = {
  auth,
  klinik,
  cabang,
  pengaturanPengguna,
  tenagaMedis,
};

export default api;
