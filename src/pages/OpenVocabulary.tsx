import { Link, useParams } from "react-router-dom"

import { Container } from "../components/Container"
import { Header } from "../components/Header"

import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { deleteWord, selectVocabularies } from "../redux/vocabularies/slice"
import { getVocabulary } from "../helpers/getVocabulary"
import { toast } from "react-toastify"
import ConfirmationToast from "../components/ConfirmationToast"

export default function OpenVocabulary() {
  const dispatch = useAppDispatch()
  const { id } = useParams()
  const vocabulary = getVocabulary(
    useAppSelector(selectVocabularies),
    id as string
  )

  const confirmDelete = (
    vocabularyId: string,
    wordId: string,
    word: string
  ) => {
    toast(
      <ConfirmationToast
        message={`Are you sure you want to delete "${word}"?`}
        onConfirm={() => {
          dispatch(deleteWord({ vocabularyId, wordId }))
        }}
      />
    )
  }

  if (!id) return

  return (
    <Container>
      <Header full={true}>
        <p className="mainTitle mb-6">
          {vocabulary.name} (count: {vocabulary.firstLang.length})
        </p>
        <ul className="btnContainer">
          <li>
            <Link className="btn btn-secondary" to="/">
              Cancel
            </Link>
          </li>
          <li>
            <Link className="btn btn-success" to="add">
              Add words
            </Link>
          </li>
          <li>
            <Link className="btn btn-primary" to="play/connecting-words">
              Play connecting words
            </Link>
          </li>
          <li>
            <Link className="btn btn-dark" to="play/guessing-words">
              Play guessing word
            </Link>
          </li>
        </ul>
      </Header>

      <main>
        <section>
          <h1 className="visually-hidden">Words list</h1>
          <ul className="itemsList">
            {vocabulary.firstLang.map((word, index) => {
              const wordsId = vocabulary.wordsIds[index]
              const translation = vocabulary.secLang[index]
              const wordId = vocabulary.wordsIds[index]

              return (
                <li className="container-for-word-pairs" key={wordsId}>
                  <div className="wordPairs">
                    <div className="word">{word}</div>
                    <div className="word">{translation}</div>
                  </div>
                  <div className="btnContainer">
                    <Link to={`change/${wordsId}`} className="btn btn-primary">
                      Change
                    </Link>
                    <a
                      className="btn btn-danger"
                      onClick={() => confirmDelete(id, wordId, word)}
                    >
                      Delete
                    </a>
                  </div>
                </li>
              )
            })}
          </ul>
        </section>
      </main>
    </Container>
  )
}
