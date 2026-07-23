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
      <span className="mx-4">•</span>
      <span className="mx-4 text-red-900 font-extrabold uppercase bg-yellow-300 px-2 py-0.5 rounded-sm border border-red-900 shadow-sm shadow-red-900/20">
        Note: If your event is on Friday, get 50% OFF on ANY plan you choose! 💥
      </span>
    </>
  );

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex h-10 items-center overflow-hidden bg-gradient-to-r from-red-600 via-[#e8c547] to-red-600 text-black font-bold text-sm tracking-wide border-b-2 border-red-900 shadow-md">
      <div className="flex animate-marquee whitespace-nowrap w-max hover:[animation-play-state:paused]">
        <div className="flex items-center min-w-full justify-around pr-4">
          {content}
        </div>
        <div className="flex items-center min-w-full justify-around pr-4">
          {content}
        </div>
      </div>
    </div>
  );
}
