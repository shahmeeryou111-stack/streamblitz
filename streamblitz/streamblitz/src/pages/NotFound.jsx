import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
export default function NotFound() {
  return (
    <>
      <Helmet><title>404 — StreamBlitz</title></Helmet>
      <section className="max-w-2xl mx-auto px-4 py-32 text-center">
        <div className="font-display text-8xl text-heat">404</div>
        <h1 className="font-display text-3xl mt-2">Page Not Found</h1>
        <p className="text-textSecondary mt-2">The stream you're looking for has ended or moved.</p>
        <Link to="/" className="btn-primary mt-6 inline-flex">Back to Live Sports</Link>
      </section>
    </>
  )
}
