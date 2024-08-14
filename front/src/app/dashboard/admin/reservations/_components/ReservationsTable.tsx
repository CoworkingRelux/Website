import { Paragraph } from "@/components/common/Paragraph";
import { utcDateFormatter } from "@/lib/utils/dateUtils";
import { IFullReservation } from "@/types/types";
import {
  CalendarCheckIcon,
  CalendarClockIcon,
  CalendarIcon,
  CalendarX,
  UserIcon,
} from "lucide-react";
import Image from "next/image";
import { EditReservationsModal } from "./modals/EditReservationsModal";

const ReservationsTable = ({
  reservations,
}: {
  reservations: IFullReservation[];
}) => {
  console.log(reservations);

  return (
    <div className="rounded-md border-2 border-primary overflow-auto">
      <table className="w-full text-sm bg-background/50 backdrop-blur-md rounded-md">
        <thead className="text-left">
          <tr>
            <th className="px-8 py-3 w-4/12">Usuario</th>
            <th className="px-8 py-3 w-4/12">Oficina</th>
            <th className="px-8 py-3 w-2/12">Fecha</th>
            <th className="px-8 py-3 w-2/12">Invitados</th>
            <th className="px-8 py-3 w-2/12"></th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation.id} className="border-t-2 border-primary">
              <td className="py-6 px-8">
                <div className="flex items-center gap-4">
                  <Image
                    src={reservation.user.imgUrl}
                    alt="user"
                    width={35}
                    height={35}
                    className="flex-shrink-0"
                  />
                  <div className="overflow-hidden">
                    <Paragraph variant="primary">
                      {reservation.user.name} {reservation.user.lastname}
                    </Paragraph>
                    <Paragraph variant="secondary" className="truncate">
                      {reservation.user.email}
                    </Paragraph>
                    <Paragraph variant="secondary">
                      {reservation.user.phone}
                    </Paragraph>
                  </div>
                </div>
              </td>
              <td className="py-6 px-8">
                <div className="flex flex-col gap-1">
                  <Paragraph variant="primary">
                    {reservation.office.name}
                  </Paragraph>
                  <Paragraph variant="secondary">
                    {reservation.office.description} (
                    {reservation.office.location})
                  </Paragraph>
                  <Paragraph variant="secondary" className="flex gap-x-2">
                    <UserIcon
                      size={20}
                      className="text-primary flex-shrink-0"
                    />
                    {reservation.office.capacity} máx.
                  </Paragraph>
                </div>
              </td>
              <td className="py-6 px-8">
                <div className="flex flex-col gap-1">
                  <Paragraph variant="primary">
                    Inicio: {utcDateFormatter(reservation.start_day)}
                  </Paragraph>
                  <Paragraph variant="secondary">
                    Fin: {utcDateFormatter(reservation.end_day)}
                  </Paragraph>
                  {!reservation.is_active ? (
                    <Paragraph
                      variant="secondary"
                      className="flex items-center gap-x-2 !text-red-500"
                    >
                      <CalendarX size={20} className="flex-shrink-0" />
                      Cancelada
                    </Paragraph>
                  ) : new Date(reservation.end_day).getDate() <
                    new Date().getDate() ? (
                    <Paragraph
                      variant="secondary"
                      className="flex items-center gap-x-2"
                    >
                      <CalendarCheckIcon size={20} className="flex-shrink-0" />
                      Terminada
                    </Paragraph>
                  ) : new Date(reservation.start_day).getDate() >
                    new Date().getDate() ? (
                    <Paragraph
                      variant="secondary"
                      className="!text-green-500 flex items-center gap-x-2"
                    >
                      <CalendarIcon size={20} className="flex-shrink-0" />
                      Pendiente
                    </Paragraph>
                  ) : (
                    <Paragraph
                      variant="secondary"
                      className="!text-blue-500 flex items-center gap-x-2"
                    >
                      <CalendarClockIcon size={20} className="flex-shrink-0" />
                      En curso
                    </Paragraph>
                  )}
                </div>
              </td>
              <td className="py-6 px-8">
                <div className="flex flex-col gap-1">
                  <Paragraph variant="primary" className="flex gap-x-2">
                    <UserIcon size={20} className="text-primary" />
                    {reservation.guests_number}
                  </Paragraph>
                </div>
              </td>
              <td className="py-6 px-8">
                <EditReservationsModal reservation={reservation} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReservationsTable;
