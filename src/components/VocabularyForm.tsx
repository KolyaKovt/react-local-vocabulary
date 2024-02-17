import { FormEventHandler } from "react"
import { UseFormRegister } from "react-hook-form"
import { Link } from "react-router-dom"
import { VocabularyFormData } from "../types"

interface Props {
  submit: FormEventHandler<HTMLFormElement>
  register: UseFormRegister<VocabularyFormData>
  btnLabel: string
}

export const VocabularyForm = ({ submit, register, btnLabel }: Props) => {
  return (
    <form onSubmit={submit}>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Name</span>
        </label>
        <input
          className="input input-bordered"
          type="text"
          {...register("name")}
          placeholder="..."
          autoComplete="off"
          required
        />
      </div>
      <div className="btnContainer mt-6">
        <Link className="btn btn-secondary" to="/">
          Cancel
        </Link>
        <button className="btn btn-primary">{btnLabel}</button>
      </div>
    </form>
  )
}
