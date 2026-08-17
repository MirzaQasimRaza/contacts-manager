function Settings() {
  return (
    <main className="min-h-[calc(100vh-80px)] bg-base-200 px-6 py-10">

      <div className="max-w-3xl mx-auto">

        <div className="card bg-base-100 shadow-xl">

          <div className="card-body">

            <h1 className="card-title text-3xl">
              Settings
            </h1>

            <p className="text-base-content/60">
              Configure your application preferences.
            </p>

            <div className="divider" />

            <div className="flex items-center justify-between p-4 rounded-xl bg-base-200">

              <div>
                <h3 className="font-bold">
                  Notifications
                </h3>

                <p className="text-sm text-base-content/60">
                  Enable application notifications
                </p>
              </div>

              <input
                type="checkbox"
                className="toggle toggle-primary"
                defaultChecked
              />

            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-base-200">

              <div>
                <h3 className="font-bold">
                  Dark Mode
                </h3>

                <p className="text-sm text-base-content/60">
                  Use dark appearance
                </p>
              </div>

              <input
                type="checkbox"
                className="toggle toggle-secondary"
              />

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}

export default Settings;