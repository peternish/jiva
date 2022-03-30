import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/router";
import style from "@styles/Layout.module.css";

export default function PageHeader({ children }) {
  const router = useRouter()
  return (
    <div className={style.pageHeader}>
      <ArrowBackIcon onClick={() => router.back()} style={{cursor: 'pointer'}} />
      <h1>{children}</h1>
    </div>
  )
}