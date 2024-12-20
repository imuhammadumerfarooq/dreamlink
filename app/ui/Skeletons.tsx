export function FormSkeleton() {
  return (
    <div className="w-[450px] flex flex-col border p-5 gap-5 rounded">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <div className="w-full h-[60px] rounded animate-pulse">
          <svg
            className="w-[70px] h-[60px] text-gray-200 dark:text-gray-600"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 18"
          >
            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
          </svg>
        </div>
        <div className="w-[300px] h-[15px] bg-gray-200 dark:bg-gray-600 rounded-full animate-pulse"></div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-5">
        <div className="w-full h-[40px] bg-gray-200 dark:bg-gray-600 rounded animate-pulse"></div>
        <div className="w-full h-[40px] bg-gray-200 dark:bg-gray-600 rounded animate-pulse"></div>
        <div className="w-full h-[40px] bg-gray-200 dark:bg-gray-600 rounded animate-pulse"></div>
        <div className="w-full h-[40px] bg-gray-200 dark:bg-gray-600 rounded animate-pulse"></div>
        <div className="w-[130px] h-[15px] bg-gray-200 dark:bg-gray-600 rounded-full animate-pulse"></div>
        <div className="w-full h-[40px] bg-gray-200 dark:bg-gray-600 rounded animate-pulse"></div>
        <div className="flex items-center gap-3">
          <div className="w-[15px] h-[15px] bg-gray-200 dark:bg-gray-600 rounded animate-pulse"></div>
          <div className="w-[150px] h-[15px] bg-gray-200 dark:bg-gray-600 rounded animate-pulse"></div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-[15px] h-[15px] bg-gray-200 dark:bg-gray-600 rounded animate-pulse"></div>
          <div className="w-[150px] h-[15px] bg-gray-200 dark:bg-gray-600 rounded animate-pulse"></div>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full h-[40px] bg-gray-200 dark:bg-gray-600 rounded animate-pulse"></div>
    </div>
  );
}

export function CustomerSkeleton() {
  return (
    <div className="h-500px space-y-4 w-full">
      <div className="flex w-[375px] gap-4">
        <div className="h-[40px] bg-gray-200 dark:bg-gray-600 rounded animate-pulse"></div>
        <div className="h-[40px] bg-gray-200 dark:bg-gray-600 rounded animate-pulse"></div>
      </div>
      <div className="w-full h-[40px] bg-gray-200 dark:bg-gray-600 rounded animate-pulse"></div>
      <div className="w-full h-[40px] bg-gray-200 dark:bg-gray-600 rounded animate-pulse"></div>
      <div className="w-full h-[40px] bg-gray-200 dark:bg-gray-600 rounded animate-pulse"></div>
      <div className="w-[130px] h-[15px] bg-gray-200 dark:bg-gray-600 rounded-full animate-pulse"></div>
    </div>
  );
}
