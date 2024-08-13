"use client";
import { useState } from "react";
import { Button } from "@/components/common/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/common/Dialogx";
import EditReservationForm from "../EditReservationForm";
import { IFullReservation, IReservation } from "@/types/types";
import { SettingsIcon } from "lucide-react";
import { Tooltip } from "@/components/common/Tooltip";

const EditReservationsModal = ({
  reservation,
}: {
  reservation: IFullReservation;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="">
      <Tooltip text="Editar">
        <div
          className="p-2 hover:bg-primary transition rounded-md cursor-pointer w-min"
          onClick={() => setIsModalOpen(true)}
        >
          <SettingsIcon size={20} />
        </div>
      </Tooltip>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="font-sans bg-background text-white border-secondaryDark max-h-[90%] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Editar reserva</DialogTitle>
            <DialogDescription className="text-secondary text-md pb-5">
              Modifica los datos de la reserva.
            </DialogDescription>
          </DialogHeader>
          <EditReservationForm reservation={reservation} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export { EditReservationsModal };
