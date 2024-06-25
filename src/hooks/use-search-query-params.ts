// useQuery.js
import { useLocation } from "react-router-dom"

function useSearchQueryParams() {
  return new URLSearchParams(useLocation().search)
}

export default useSearchQueryParams
