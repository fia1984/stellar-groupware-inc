function VideoSection() {
  return (
    <section className="bg-white px-6 py-14 sm:py-20">
      <div className="mx-auto max-w-6xl text-center">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-700 sm:text-sm">
          Watch & Learn
        </p>

        <h2 className="mt-4 text-3xl font-extrabold leading-tight text-slate-950 sm:text-4xl">
          See how mentoring can support your career growth.
        </h2>

        <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600">
          Explore how career mentoring, guidance, and structured support can help
          learners build confidence and prepare for professional growth.
        </p>

        <div className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 shadow-xl">
          <iframe
            className="aspect-video w-full"
            src="https://www.youtube.com/embed/XoZdIzjFIFE"
            title="Career mentoring video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>

        <p className="mx-auto mt-6 max-w-3xl leading-7 text-slate-600">
          Stellar Groupware Inc. focuses on practical IT training, mentoring,
          project guidance, and career-readiness support.
        </p>
      </div>
    </section>
  );
}

export default VideoSection;
