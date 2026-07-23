export function AnnouncementBar() {
  const content = (
    <>
      <span className="mx-4">🔥 SEASONAL OFFER: PRE-BOOKING SLOTS FOR VINAYAKA CHAVITHI ARE OPEN! 🐘</span>
      <span className="mx-4">•</span>
      <span className="mx-4">Basic Plan: 3500/-</span>
      <span className="mx-4">•</span>
      <span className="mx-4">Standard Plan: 7000/-</span>
      <span className="mx-4">•</span>
      <span className="mx-4">Premium Plan: 12000/-</span>
      <span className="mx-4">•</span>
      <span className="mx-4">🚨 HURRY UP! BOOK YOUR SLOTS NOW! 🚨</span>
    </>
  );

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex flex-col w-full shadow-lg">
      {/* STATIC FRIDAY OFFER - ALWAYS VISIBLE */}
      <div className="bg-red-600 text-white font-extrabold text-sm md:text-base py-1.5 px-4 text-center border-b-2 border-yellow-400 tracking-wider">
        🔥 EVERY FRIDAY SALE: Get 50% OFF on ANY plan you choose if your event is on a Friday! 💥
      </div>
      
      {/* SCROLLING MARQUEE */}
      <div className="flex h-8 items-center overflow-hidden bg-gradient-to-r from-[#e8c547] via-yellow-300 to-[#e8c547] text-black font-bold text-xs md:text-sm tracking-wide border-b border-white/10">
        <div className="flex animate-marquee whitespace-nowrap w-max hover:[animation-play-state:paused]">
          <div className="flex items-center min-w-full justify-around pr-4">
            {content}
          </div>
          <div className="flex items-center min-w-full justify-around pr-4">
            {content}
          </div>
        </div>
      </div>
    </div>
  );
}
