import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

export default function PaginatedItems({
  handlePageClick,
  pageCount,
  previousLabel,
  nextLabel,
}) {
  return (
    <>
      <ReactPaginate
        breakLabel="..."
        className="flex mt-10 items-center justify-center mb-10 container mx-auto"
        pageClassName="mx-2 rounded-full w-[40px] h-[40px]  bg-slate-200 font-bold text-slate-500"
        previousClassName="mx-2 rounded-full w-[40px] h-[40px] flex  bg-slate-200 font-bold text-slate-500"
        nextClassName="mx-2 rounded-full w-[40px] h-[40px] flex  bg-slate-200 font-bold text-slate-500"
        pageLinkClassName="w-full h-full flex items-center justify-center paginated-btn rounded-full"
        previousLinkClassName="w-full h-full flex items-center justify-center paginated-btn rounded-full"
        nextLinkClassName="w-full h-full flex items-center justify-center paginated-btn rounded-full"
        activeClassName="bg-red-600"
        activeLinkClassName="bg-red-600 text-white"
        disabledLinkClassName="disabled"
        previousLabel={previousLabel}
        nextLabel={nextLabel}
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        renderOnZeroPageCount={null}
      />
    </>
  );
}
