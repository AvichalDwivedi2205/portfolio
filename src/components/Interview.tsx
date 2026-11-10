import { interview, verdict } from '../data'
import { useReveal } from '../hooks'
import { R, SectionHead } from './ui'

/* Set like a magazine Q&A: the question in the serif, the answer beside it, and the interviewer's
   verdict stamped at the bottom. The interviewer is Aperture, the voice agent from the work section. */
export function Interview() {
  const stamp = useReveal<HTMLDivElement>()
  return (
    <section className="talk" id="chat" data-theme="light">
      <div className="wrap">
        <SectionHead
          label="In conversation"
          title="Five questions, *straight* *answers.*"
          note={<>Asked by Aperture,<br />the voice interviewer I built</>}
        />

        <ol className="qa">
          {interview.map((t, i) => (
            <R as="li" key={i} className="qa-row">
              <span className="qa-n" aria-hidden>Q{i + 1}</span>
              <h3 className="qa-q">{t.q}</h3>
              <p className="qa-a" dangerouslySetInnerHTML={{ __html: t.a }} />
            </R>
          ))}
        </ol>

        <div className="talk-end">
          <R as="p" className="talk-last">
            <span className="mono dim">Aperture, closing remarks</span>
            “{verdict.line}”
          </R>
          <div className="stamp" ref={stamp} role="img" aria-label={`Verdict: ${verdict.stamp}`}>
            <span className="mono">Aperture · verdict</span>
            <b>{verdict.stamp}</b>
            <span className="mono">session #0412 · on the record</span>
          </div>
        </div>
      </div>
    </section>
  )
}
