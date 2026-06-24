import { useEffect } from "react"

const useTitle = (title) => {
    useEffect(()=>{
        document.title = `${title}/Cine Comerade`
    })
  return null
}

export default useTitle
