'use client'

export function PrintButton() {
  return (
    <button
      className="neo-button print:hidden"
      onClick={() => window.print()}
      aria-label="Download place packet as PDF"
    >
      Download PDF
    </button>
  )
}
