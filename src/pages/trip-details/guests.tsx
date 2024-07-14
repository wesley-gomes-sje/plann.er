import { CircleCheck, CircleDashed, UserCog } from "lucide-react";
import { Button } from "../../components/button";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";
import { FormEvent, useEffect, useState } from "react";
import { InviteSomeoneGuest } from "./invite-someone-guest";

interface Participant {
  id: string;
  name: string | null;
  email: string;
  is_confirmed: boolean;
}

export function Guests() {
  const { tripId } = useParams();
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [isAddMoreGuestsModalOpen, setIsAddMoreGuestsModalOpen] =
    useState(false);

  useEffect(() => {
    api
      .get(`/trips/${tripId}/participants`)
      .then((response) => setParticipants(response.data.participants));
  }, [tripId]);

  function openAddMoreGuestsModal() {
    setIsAddMoreGuestsModalOpen(true);
  }

  function closeAddMoreGuestsModal() {
    setIsAddMoreGuestsModalOpen(false);
  }

  async function sendInvite(event: FormEvent<HTMLFormElement>) {
    const data = new FormData(event.currentTarget);
    const email = data.get("email")?.toString();

    await api.post(`/trips/${tripId}/invites`, { email });
  }

  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Convidados</h2>
      <ul className="space-y-5">
        {participants.map((participant, index) => (
          <li key={index} className="flex items-center justify-between gap-4">
            <div className="space-y-1.5">
              <span className="block font-medium text-zinc-100">
                {participant.name ?? `Convidado ${index}`}
              </span>
              <span className="block text-sm text-zinc-400 truncate">
                {participant.email}
              </span>
            </div>
            {participant.is_confirmed ? (
              <CircleCheck className="size-5 text-lime-300 shrink-0" />
            ) : (
              <CircleDashed className="size-5 text-zinc-400 shrink-0" />
            )}
          </li>
        ))}
      </ul>
      <Button onClick={openAddMoreGuestsModal} variant="secondary" size="full">
        <UserCog className="size-5" />
        Gerenciar convidados
      </Button>
      {isAddMoreGuestsModalOpen && (
        <InviteSomeoneGuest
          closeInviteSomeoneGuest={closeAddMoreGuestsModal}
          sendInvite={sendInvite}
        />
      )}
    </div>
  );
}
