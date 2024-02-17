import { Link } from "react-router-dom"

import { Container } from "../components/Container"
import { Header } from "../components/Header"

import { useAppDispatch, useAppSelector } from "../redux/hooks"
import {
  deleteVocabulary,
  selectVocabularies,
} from "../redux/vocabularies/slice"

export default function ListVocabularies() {
  const dispatch = useAppDispatch()
  const vocabularies = useAppSelector(selectVocabularies)

  return (
    <>
      <Container>
        <Header full={false}>
          <p className="mainTitle mb-6">Vocabularies</p>
          <Link className="btn btn-success" to="/new">
            New vocabulary
          </Link>
        </Header>

        <main>
          <section>
            <h2 className="visually-hidden">Vocabularies list</h2>
            <ul className="itemsList">
              {vocabularies.map(vocabulary => {
                const { id, name, exercise } = vocabulary

                return (
                  <li key={id}>
                    <div className="btnContainer mb-4 font-bold text-2xl overflow-x-auto">
                      <p>{name}</p>
                      <p>({exercise})</p>
                    </div>
                    <ul className="btnContainer">
                      <li>
                        <Link className="btn btn-secondary" to={`/${id}`}>
                          Open
                        </Link>
                      </li>
                      <li>
                        <Link className="btn btn-primary" to={`/rename/${id}`}>
                          Rename
                        </Link>
                      </li>
                      <li>
                        <button
                          className="btn btn-danger"
                          onClick={() =>
                            dispatch(deleteVocabulary(id))
                          }
                        >
                          Delete
                        </button>
                      </li>
                    </ul>
                  </li>
                )
              })}
            </ul>
          </section>
        </main>
      </Container>
    </>
  )
}
