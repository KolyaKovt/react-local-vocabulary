import { toast } from "react-toastify"

interface Props {
  message: string
  onConfirm: () => void
}

const ConfirmationToast = ({ message, onConfirm }: Props) => {
  const handleConfirm = () => {
    toast.dismiss()
    onConfirm()
  }

  const handleCancel = () => {
    toast.dismiss()
  }

  return (
    <div>
      <p className="mb-2">{message}</p>

      <div className="btnContainer">
        <button className="btn btn-sm btn-primary" onClick={handleConfirm}>
          Yes
        </button>
        <button className="btn btn-sm btn-secondary" onClick={handleCancel}>
          No
        </button>
      </div>
    </div>
  )
}

export default ConfirmationToast
