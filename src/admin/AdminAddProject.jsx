  import AddProject from "../components/AddProjects";

  const AdminAddProject = () => {
    return (
      <div className="min-h-screen bg-[#0b0908] px-6 py-10 md:px-10">
        {/* Header */}
        <div className="mb-10 border-b border-white/5 pb-6">
          <p className="text-purple-400 uppercase tracking-[0.25em] text-xs mb-2">
            Admin Panel
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Add New Project
          </h2>

          <p className="text-white/50 mt-3 max-w-lg text-sm md:text-base">
            Create and publish a new portfolio project by filling the form below.
          </p>
        </div>

        {/* Form Container */}
        <div className="rounded-2xl border border-white/5 bg-[#141414] p-6 md:p-8 shadow-[0_0_40px_rgba(139,92,246,0.05)]">
          <AddProject />
        </div>
      </div>
    );
  };

  export default AdminAddProject;