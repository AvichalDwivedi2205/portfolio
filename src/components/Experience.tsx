import { experience, skills } from '../data'
import { Rule, R, SectionHead } from './ui'

export function Experience() {
  return (
    <section className="xp" id="xp" data-theme="dark">
      <div className="wrap">
        <SectionHead label="Experience" title="Jobs, labs and one classified room." />
        <div className="xp-list">
          {experience.map((x, i) => (
            <R key={i} className="xrow">
              <span className="mono dim">{x.yr}</span>
              <div className="xrow-role">
                <h3>{x.role}</h3>
                {x.href
                  ? <a className="label dim" href={x.href} target="_blank" rel="noopener">{x.org} ↗</a>
                  : <span className="label dim">{x.org}</span>}
              </div>
              <p className="dim">{x.body}</p>
              <span className="mono dim xrow-loc">{x.loc}</span>
            </R>
          ))}
        </div>

        <div className="skills-rule"><Rule /></div>

        <div className="skills">
          <R as="span" className="label"><i className="sq" />Toolkit</R>
          <div className="skills-grid">
            {Object.entries(skills).map(([group, items], i) => (
              <R key={group} delay={i * 0.08}>
                <span className="mono dim">{group}</span>
                <ul>{items.map(s => <li key={s}>{s}</li>)}</ul>
              </R>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
