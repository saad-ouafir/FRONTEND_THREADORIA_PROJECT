import React, { useState } from "react";

const Dialog = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      {dialogOpen && (
        <div
          className="bg-[#00000027] z-[2000000000] fixed flex
                  items-center justify-center top-0 left-0 w-full h-screen">
          <div
            className="absolute top-0 left-0 h-full w-full cursor-pointer backdrop-blur-[2px]"
            onClick={() => setDialogOpen(false)}></div>
          <div className="max-w-md w-[90vw] dark:bg-slate-800 h-auto bg-white rounded relative z-10 px-4 py-3">
            <h1 className="font-semibold dark:text-[#abc2d3] text-xl mb-2">
              Delete Item
            </h1>
            <p className="text-gray-600 dark:text-slate-400 mb-2">
              Are you sure you want to delete this? This action cannot be
              undone.
            </p>
            <div className="w-full flex items-center justify-end gap-2">
              <button
                className="font-semibold px-1.5 dark:hover:bg-red-800/20 py-1 hover:bg-gray-100 rounded text-sm uppercase text-red-500"
                onClick={() => setDialogOpen(false)}>
                Cancel
              </button>
              <button
                className="font-semibold px-1.5 dark:hover:bg-blue-800/20 py-1 hover:bg-gray-100 rounded text-sm uppercase text-blue-600"
                onClick={() => setDialogOpen(false)}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dialog;
