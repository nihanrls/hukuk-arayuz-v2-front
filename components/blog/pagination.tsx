interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const handlePageChange = (page: number) => {
    onPageChange(page);
    // Sayfanın en üstüne yumuşak bir şekilde scroll
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, 0); // 0 ms gecikme ile scroll işlemi
  };

  return (
    <div className="flex justify-center items-center space-x-2 mt-8">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-lg ${
          currentPage === 1 
            ? 'bg-gray-100 text-gray-400' 
            : 'bg-[#6454a4] text-white hover:bg-[#6454a4]/90'
        }`}
      >
        Önceki
      </button>
      
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`px-4 py-2 rounded-lg ${
            currentPage === page
              ? 'bg-[#6454a4] text-white'
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded-lg ${
          currentPage === totalPages
            ? 'bg-gray-100 text-gray-400'
            : 'bg-[#6454a4] text-white hover:bg-[#6454a4]/90'
        }`}
      >
        Sonraki
      </button>
    </div>
  );
};

export default Pagination;
