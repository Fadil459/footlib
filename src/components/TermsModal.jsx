import { useEffect } from 'react'

export default function TermsModal({ onClose, t }) {
  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-panel modal-panel--terms" onClick={e => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label={t.close}>×</button>
        <h2 className="modal-title terms-title">{t.termsTitle}</h2>
        <div className="terms-body">
          {t.termsBody.map((p, i) => <p key={i}>{p}</p>)}
        </div>
      </div>
    </div>
  )
}
