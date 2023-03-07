import { Toast } from "primereact/toast"
import useUpdateS3 from "../../../hooks/useUpdateS3"
import Modal from "../Modal"
import { IFooter } from "./interfaces"

const Footer = ({onSubmit}:IFooter) =>{
    const { onSubmit:SubmitS3, loading, toast:UpdateS3Toast } = useUpdateS3()

    const submitConjuntedFunction = () => {
        onSubmit()
        SubmitS3()
    }
    return (
    <>
        <Toast ref={UpdateS3Toast} />
        <Modal disabled={loading} 
        label='Enviar cambios' 
        title='Se realizaron cambios, si confirmas se enviarán directo al S3' 
        confirmFn={submitConjuntedFunction}/>
    </>
    )
}
export default Footer