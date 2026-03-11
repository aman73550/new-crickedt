export default function Loading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded-lg mb-2" />
          <div className="h-4 w-64 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>
        <div className="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded-full" />
      </div>

      {/* Section Title Skeleton */}
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded" />
        <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded" />
      </div>

      {/* Match Cards Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="card p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-full" />
                <div className="h-6 w-12 bg-gray-200 dark:bg-gray-700 rounded-full" />
              </div>
              <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
            
            <div className="space-y-3">
              {[1, 2].map((j) => (
                <div key={j} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg" />
                    <div className="space-y-1">
                      <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
                      <div className="h-3 w-32 bg-gray-200 dark:bg-gray-700 rounded" />
                    </div>
                  </div>
                  <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
                </div>
              ))}
            </div>
            
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex justify-between">
                <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded" />
                <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Analytics Section Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Chart Skeleton */}
          <div className="card p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-5 w-32 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded-xl" />
              <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded-xl" />
            </div>
            <div className="h-[300px] bg-gray-200 dark:bg-gray-700 rounded-xl" />
          </div>
        </div>
        
        <div className="space-y-6">
          {/* Sidebar Skeleton */}
          <div className="card p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-5 w-28 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
            <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-xl" />
          </div>
          <div className="card p-6">
            <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
