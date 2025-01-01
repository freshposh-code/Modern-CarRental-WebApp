"use client";
import React, { useState } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "../ui/animated-modal";
import { motion } from "framer-motion";
import { IoIosCar } from "react-icons/io";
import { CategoryData } from "./PopularSection";

interface ItemsData {
  data: CategoryData;
}

export function AnimatedModalDemo({data}: ItemsData) {
  return (
    <div className="flex items-center justify-center">
      <Modal>
        <ModalTrigger className="bg-blue-600 rounded-full text-white flex justify-center group/modal-btn">
          <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500 lg:text-base xm:text-[9px] text-[6px]">
            Rent Now
          </span>
          <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
            <IoIosCar/>
          </div>
        </ModalTrigger>
        
        <ModalBody>
          <ModalContent>
            <h4 className="text-sm md:text-xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8">
            Drive Your Dream Car{" "}
              <span className="bg-black-200 dark:bg-white-200 p-1 text-white dark:text-black rounded-xl">
                Adventures
              </span>{" "}
              awaits! ✈️
            </h4>
            <div className="flex justify-center items-center">
              {data?.carImage.map((image, idx) => (
                <motion.div
                  key={"images" + idx}
                  style={{
                    rotate: Math.random() * 20 - 10,
                  }}
                  whileHover={{
                    scale: 1.1,
                    rotate: 0,
                    zIndex: 100,
                  }}
                  whileTap={{
                    scale: 1.1,
                    rotate: 0,
                    zIndex: 100,
                  }}
                  className="rounded-xl -mr-4 mt-4 p-1 bg-white dark:bg-neutral-800 dark:border-neutral-700 border-[3px] border-neutral-100 flex-shrink-0 overflow-hidden"
                >
                  <img
                    src={image}
                    alt="car images"
                    width="500"
                    height="500"
                    className="rounded-lg h-20 w-20 md:h-32 md:w-32 object-contain"
                  />
                </motion.div>
              ))}
            </div>
            <div className="md:py-10 py-5 flex flex-wrap gap-x-4 gap-y-3 items-start justify-center max-w-sm mx-auto">
              <div className="flex items-center justify-center">
                <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                  {data?.passengers} passengers
                </span>
              </div>
              <div className="flex items-center justify-center">           
                <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                  5 connecting flights
                </span>
              </div>
              <div className="flex items-center justify-center">            
                <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                  69 visiting spots
                </span>
              </div>
            </div>

            <div className="">
              <h1 className="md:text-sm text-xs py-2 font-normal font-serif">{data?.description}</h1>
            </div>
          </ModalContent>
          
          <ModalFooter className="gap-4">
            <button className="bg-black text-white dark:bg-white dark:text-black text-sm md:px-2 px-1 md:py-2 py-1 rounded-md border border-black hover:scale-75">
              Book Now
            </button>
          </ModalFooter>
        </ModalBody>
      </Modal>
    </div>
  );
}
 