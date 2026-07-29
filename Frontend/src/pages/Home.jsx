import { Navigate, useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore.js";

const Home = () => {
  const { token } = useAuthStore();
  const navigate = useNavigate();

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-[#F7F4EE] relative overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,340;9..144,480;9..144,600&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
        .font-display { font-family: 'Fraunces', serif; font-optical-sizing: auto; }
        .font-body { font-family: 'Inter', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
      `}</style>

      {/* Soft daylight wash */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(200,138,62,0.10),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(200,138,62,0.08),transparent_50%)]" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-10">

        {/* Wordmark */}
        <div className="flex items-center gap-2 mb-16">
          <div className="h-2 w-2 rounded-full bg-[#C88A3E]" />
          <span className="font-mono text-xs tracking-[0.25em] text-[#8A8377] uppercase">
            ArtMart — est. marketplace
          </span>
        </div>

        <div className="grid lg:grid-cols-2 items-center gap-20">

          {/* Left Section */}
          <div>
            <span className="font-mono inline-block text-[11px] tracking-[0.2em] uppercase text-[#B87830] border border-[#C88A3E]/40 bg-[#C88A3E]/5 rounded-full px-4 py-1.5">
              Roll 001 · Now Showing
            </span>

            <h1 className="font-display mt-8 text-6xl md:text-7xl leading-[1.05] tracking-tight text-[#221F1C]">
              Capture moments.
              <br />
              <span className="italic font-light text-[#B87830]">
                Sell stories.
              </span>
            </h1>

            <p className="font-body mt-8 max-w-lg text-lg leading-8 text-[#6B665D]">
              A marketplace where photographers hang their best work for the
              world to see — and buyers take home originals, straight from
              the source.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <button
                onClick={() => navigate("/signup")}
                className="font-body rounded-full bg-[#221F1C] px-8 py-4 text-[#F7F4EE] font-semibold tracking-tight transition-all duration-300 hover:bg-[#3A362F] hover:-translate-y-0.5"
              >
                Get started
              </button>

              <button
                onClick={() => navigate("/login")}
                className="font-body rounded-full border border-[#D8D0C0] bg-white px-8 py-4 font-semibold text-[#221F1C] transition-all duration-300 hover:border-[#B87830]/40 hover:bg-[#C88A3E]/5"
              >
                Log in
              </button>
            </div>

            {/* EXIF-style stats strip */}
            <div className="font-mono mt-16 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs tracking-wide text-[#8A8377] border-t border-[#D8D0C0] pt-6">
              <span><span className="text-[#221F1C] font-medium">1,000+</span> photos</span>
              <span className="text-[#D8D0C0]">/</span>
              <span><span className="text-[#221F1C] font-medium">500+</span> creators</span>
              <span className="text-[#D8D0C0]">/</span>
              <span><span className="text-[#221F1C] font-medium">24-7</span> access</span>
            </div>
          </div>

          {/* Right Section — framed print on the wall */}
          <div className="relative flex justify-center lg:justify-end">

            {/* Ambient glow, golden daylight */}
            <div className="absolute h-72 w-72 rounded-full bg-[#C88A3E]/15 blur-3xl" />

            {/* Frame */}
            <div className="relative rotate-2 transition-transform duration-500 hover:rotate-0">
              <div className="rounded-sm bg-[#2B2824] p-3 shadow-[0_30px_60px_-15px_rgba(43,40,36,0.25)] border border-[#3A362F]">
                {/* Mat board */}
                <div className="bg-[#FBFAF6] p-4 pb-16 relative">
                  <img
                    src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80"
                    alt="Featured photograph"
                    className="h-[420px] w-[420px] object-cover"
                  />

                  {/* Museum placard */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between font-mono text-[10px] tracking-wide text-[#221F1C]/70 uppercase">
                    <span>Original print</span>
                    <span className="text-[#B87830] font-medium">For sale</span>
                  </div>
                </div>
              </div>

              {/* Hanging tag */}
              <div className="absolute -right-4 top-10 bg-white rounded-sm px-3 py-2 shadow-lg rotate-6 border border-[#D8D0C0]">
                <p className="font-mono text-[9px] uppercase tracking-wider text-[#8A8377]">Shot on</p>
                <p className="font-display text-sm text-[#221F1C] italic">35mm film</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Home;