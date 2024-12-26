import Link from "next/link";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { DynamicURLProps } from "../lib/definitions";

export default function DynamicURL({ url }: DynamicURLProps) {
  return (
    <div className="w-full flex justify-between">
      <Link
        href={url}
        target="_blank"
        className="w-full flex justify-center items-center"
      >
        Go to link
      </Link>

      <div className="flex justify-center w-full text-white bg-[#193A8C] rounded-md h-9">
        <Drawer>
          <DrawerTrigger>Open here</DrawerTrigger>
          <DrawerContent className="h-[600px]">
            <DrawerHeader className="flex flex-col items-center">
              <DrawerTitle>Checkout</DrawerTitle>
              <DrawerDescription>Safepay Checkout</DrawerDescription>
            </DrawerHeader>
            <iframe
              src={url}
              aria-describedby={undefined}
              className="h-full"
            ></iframe>
            <DrawerFooter>
              <DrawerClose>
                <div className="border border-gray-200 hover:bg-gray-100 inline-block px-5 py-1 rounded-md">
                  Close
                </div>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
}
