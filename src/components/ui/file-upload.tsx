import { cn } from "@/lib/utils";
import React, { ChangeEvent, useRef, useState } from "react";
import { motion } from "framer-motion";
import { MdCloudUpload } from "react-icons/md";
import { useDropzone } from "react-dropzone";
import { FaTrash } from "react-icons/fa";

const mainVariant = {
  initial: {
    x: 0,
    y: 0,
  },
  animate: {
    x: 20,
    y: -20,
    opacity: 0.9,
  },
};

const secondaryVariant = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
};

export const FileUpload = ({
    onChange,
    dataValue,
    handleOnChange,
    handleDelete,
  }: {
    onChange?: (files: File[]) => void;
    dataValue: string[];
    handleOnChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleDelete: (index: number) => void;
  }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    
    const handleClick = () => {
      fileInputRef.current?.click();
    };
  
    const { getRootProps, isDragActive } = useDropzone({
      multiple: false,
      noClick: true,
      onDrop: (files) => {
        onChange && onChange(files);
      },
      onDropRejected: (error) => {
        console.log(error);
      },
    });
  
    return (
      <div className="w-full" {...getRootProps()}>
        <motion.div
          onClick={handleClick}
          whileHover="animate"
          className="p-10 group/file block rounded-lg cursor-pointer w-full relative overflow-hidden"
        >
          <input
            ref={fileInputRef}
            id="file-upload-handle"
            type="file"
             name="file-upload"
            onChange={handleOnChange}
            className="hidden"
          />
          <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]">
            <GridPattern />
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="relative w-full mt-10 max-w-xl mx-auto">
              {dataValue.length > 0 ? (
                dataValue.map((url, idx) => (
                  <motion.div
                    key={"uploaded-image-" + idx}
                    layoutId={idx === 0 ? "file-upload" : "file-upload-" + idx}
                    className={cn(
                      "relative overflow-hidden z-40 bg-white dark:bg-neutral-900 flex flex-col items-center justify-center md:h-24 p-4 mt-4 w-full mx-auto rounded-md",
                      "shadow-sm"
                    )}
                  >
                    <img
                      src={url}
                      alt={`Uploaded file ${idx + 1}`}
                      className="max-h-24 w-auto object-contain"
                    />
                     <button
                       onClick={() => handleDelete(idx)}
                       className="absolute top-0 right-0 bg-red-500 text-white p-2 rounded-full">
                   <FaTrash/>
                   </button>
                  </motion.div>
                ))
              ) : (
                <motion.div
                  layoutId="file-upload"
                  variants={mainVariant}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  }}
                  className={cn(
                    "relative group-hover/file:shadow-2xl z-40 bg-white dark:bg-neutral-900 flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md",
                    "shadow-[0px_10px_50px_rgba(0,0,0,0.1)]"
                  )}
                >
                  {isDragActive ? (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-neutral-600 flex flex-col items-center"
                    >
                      Drop it
                      <MdCloudUpload className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
                    </motion.p>
                  ) : (
                    <MdCloudUpload className="h-4 w-4 text-neutral-600 dark:text-neutral-300" />
                  )}
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    );
  };
  

export function GridPattern() {
  const columns = 41;
  const rows = 11;
  return (
    <div className="flex bg-gray-100 dark:bg-neutral-900 flex-shrink-0 flex-wrap justify-center items-center gap-x-px gap-y-px  scale-105">
      {Array.from({ length: rows }).map((_, row) =>
        Array.from({ length: columns }).map((_, col) => {
          const index = row * columns + col;
          return (
            <div
              key={`${col}-${row}`}
              className={`w-10 h-10 flex flex-shrink-0 rounded-[2px] ${
                index % 2 === 0
                  ? "bg-gray-50 dark:bg-neutral-950"
                  : "bg-gray-50 dark:bg-neutral-950 shadow-[0px_0px_1px_3px_rgba(255,255,255,1)_inset] dark:shadow-[0px_0px_1px_3px_rgba(0,0,0,1)_inset]"
              }`}
            />
          );
        })
      )}
    </div>
  );
}
