type SectionHeadingProps = {
  eyebrow: string
  title: string
  description?: string
  inverse?: boolean
  titleId?: string
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  inverse = false,
  titleId,
}: SectionHeadingProps) {
  return (
    <div className={`section-heading ${inverse ? 'section-heading--inverse' : ''}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={titleId}>{title}</h2>
      {description && <p className="section-description">{description}</p>}
    </div>
  )
}
