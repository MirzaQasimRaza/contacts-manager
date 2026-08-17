function Info() {
  return (
    <main className="min-h-[calc(100vh-80px)] bg-base-200 px-6 py-10">

      <div className="max-w-3xl mx-auto">

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">

            <div className="w-fit">
              About
            </div>

            <h1 className="card-title text-3xl">
              Contact Manager
            </h1>

            <p className="text-base-content/70">
              A simple contact management application built
              with React, TypeScript and React Router.
            </p>

            <div className="divider" />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

              <div className="stat bg-base-200 rounded-xl">
                <div className="stat-title">Frontend</div>
                <div className="stat-value text-primary text-2xl">
                  React
                </div>
              </div>

              <div className="stat bg-base-200 rounded-xl">
                <div className="stat-title">Language</div>
                <div className="stat-value text-secondary text-2xl">
                  TS
                </div>
              </div>

              <div className="stat bg-base-200 rounded-xl">
                <div className="stat-title">Routing</div>
                <div className="stat-value text-accent text-2xl">
                  Router
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>

    </main>
  );
}

export default Info;