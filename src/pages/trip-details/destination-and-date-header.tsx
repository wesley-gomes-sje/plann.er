import { MapPin, Calendar, Settings2 } from "lucide-react";
import { Button } from "../../components/button";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../lib/axios";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { UpdateTripModal } from "./update-trip";

interface Trip {
  id: string;
  destination: string;
  ends_at: string;
  starts_at: string;
  is_confirmed: boolean;
}

export function DestinationAndDateHeader() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState<Trip | undefined>();

  const [isUpdateTripModalOpen, setIsUpdateTripModalOpen] = useState(false);

  function openUpdateTripModal() {
    setIsUpdateTripModalOpen(true);
  }

  function closeUpdateTripModal() {
    setIsUpdateTripModalOpen(false);
  }

  useEffect(() => {
    api.get(`/trips/${tripId}`).then((response) => setTrip(response.data.trip));
  }, [tripId]);

  const displayedDate = trip
    ? format(trip.starts_at, "d' de ' LLLL", { locale: ptBR })
        .concat(" a ")
        .concat(format(trip.ends_at, "d' de ' LLLL", { locale: ptBR }))
    : null;

  async function handleSave(updatedTrip: {
    destination: string;
    starts_at: Date;
    ends_at: Date;
  }) {
    if (!trip) return;

    const updatedTripData = {
      ...trip,
      destination: updatedTrip.destination,
      starts_at: updatedTrip.starts_at.toISOString(),
      ends_at: updatedTrip.ends_at.toISOString(),
    };

    await api.put(`/trips/${trip.id}`, updatedTripData).then((response) => {
      setTrip(response.data.trip);
      window.location.reload();
      closeUpdateTripModal();
    });
  }

  return (
    <div className="px-4 h-16 rounded-xl bg-zinc-900 shadow-shape flex items-center justify-between">
      <div className="flex items-center gap-2">
        <MapPin className="size-5 text-zinc-400" />
        <span className="text-zinc-100">{trip?.destination}</span>
      </div>
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2">
          <Calendar className="size-5 text-zinc-400" />
          <span className="text-zinc-100">{displayedDate}</span>
        </div>
        <div className="w-px h-6 bg-zinc-800"></div>
        <Button onClick={openUpdateTripModal} variant="secondary">
          Alterar local/data
          <Settings2 className="size-5" />
        </Button>
      </div>
      {isUpdateTripModalOpen && (
        <UpdateTripModal
          closeUpdateTripModal={closeUpdateTripModal}
          destination={trip?.destination}
          displayedDate={displayedDate}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
