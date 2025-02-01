
import { FaEye } from "react-icons/fa";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"

const DataCards = ({type,unique}) => {
  return (
    <div>
      <div className="bg-white flex-col rounded-md border border-gray-300 relative h-40 flex items-center justify-center shadow-md p-4">
        
        <Dialog>
        <DialogTrigger><FaEye className=" w-6 h-5 text-gray-400 absolute top-4 right-4"/></DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{type}</DialogTitle>
            <DialogDescription>
              <img src="" alt="" />
            </DialogDescription>
            <DialogDescription>
              {unique}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      
        <h1 className="text-lg font-semibold">{type}</h1>
        <p className="text-sm text-gray-500">{unique}</p>
      </div>
    </div>
  );
};

export default DataCards;
