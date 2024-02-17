import { FormEventHandler } from "react"
import { UseFormRegister } from "react-hook-form"
import { Link, useParams } from "react-router-dom"

import { WordFormData } from "../types"

interface Props {
  submit: FormEventHandler<HTMLFormElement>
  register: UseFormRegister<WordFormData>
  btnLabel: string
}

export const WordForm = ({ submit, register, btnLabel }: Props) => {
  const { id } = useParams()

  return (
    <form onSubmit={submit}>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Word</span>
        </label>
        <input
          className="input input-bordered"
          type="text"
          {...register("word")}
          placeholder="..."
          autoComplete="off"
          required
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Translation</span>
        </label>
        <input
          className="input input-bordered"
          type="text"
          {...register("translation")}
          placeholder="..."
          autoComplete="off"
          required
        />
      </div>
      <div className="btnContainer mt-6">
        <Link className="btn btn-secondary" to={`/${id}`}>
          Cancel
        </Link>
        <button className="btn btn-primary">{btnLabel}</button>
      </div>
    </form>
  )
}
