export function Stats() {
  return (
    <div className="bg-white py-12 border-t border-b">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-semibold text-slate-900 mb-1">4.98</div>
            <div className="text-slate-500 text-sm">Average Rating</div>
          </div>
          <div>
            <div className="text-4xl font-semibold text-slate-900 mb-1">1,284</div>
            <div className="text-slate-500 text-sm">Happy Customers</div>
          </div>
          <div>
            <div className="text-4xl font-semibold text-slate-900 mb-1">98%</div>
            <div className="text-slate-500 text-sm">On-time Rate</div>
          </div>
          <div>
            <div className="text-4xl font-semibold text-slate-900 mb-1">12k+</div>
            <div className="text-slate-500 text-sm">Rides Completed</div>
          </div>
        </div>
      </div>
    </div>
  );
}
