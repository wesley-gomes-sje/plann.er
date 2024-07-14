import { Calendar, MapPin, X } from "lucide-react";
import { useEffect, useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import { Button } from "../../components/button";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface UpdateTripModalProps {
  closeUpdateTripModal: () => void;
  destination: string | undefined;
  displayedDate: string | null;
  onSave: (updatedTrip: {
    destination: string;
    starts_at: Date;
    ends_at: Date;
  }) => void;
}
export function UpdateTripModal({
  closeUpdateTripModal,
  destination,
  displayedDate,
  onSave,
}: UpdateTripModalProps) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [eventStartAndEndDates, setEventStartAndEndDates] = useState<
    DateRange | undefined
  >();

  const [editDestination, setEditDestination] = useState<string>(
    destination || ""
  );
  const [formattedDate, setFormattedDate] = useState<string | null>(
    displayedDate
  );

  useEffect(() => {
    if (eventStartAndEndDates?.from && eventStartAndEndDates?.to) {
      const newFormattedDate = format(
        eventStartAndEndDates.from,
        "d' de ' LLLL",
        { locale: ptBR }
      )
        .concat(" a ")
        .concat(
          format(eventStartAndEndDates.to, "d' de ' LLLL", { locale: ptBR })
        );
      setFormattedDate(newFormattedDate);
    }
  }, [eventStartAndEndDates]);

  function openDatePicker() {
    setIsDatePickerOpen(true);
  }

  function closeDatePicker() {
    setIsDatePickerOpen(false);
  }

  function handleSave() {
    if (
      eventStartAndEndDates?.from &&
      eventStartAndEndDates?.to &&
      editDestination
    ) {
      onSave({
        destination: editDestination,
        starts_at: eventStartAndEndDates.from,
        ends_at: eventStartAndEndDates.to,
      });

      closeUpdateTripModal();

      return;
    }

    alert("Preencha todos os campos");
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Atualizar a viagem</h2>
            <button type="button" onClick={closeUpdateTripModal}>
              <X className="size-5 text-zinc-400" />
            </button>
          </div>
          <p className="text-sm text-zinc-400">
            Atualize o local e a data da viagem.
          </p>
          <div className="space-y-2">
            <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
              <MapPin className="size-5 text-zinc-400" />
              <input
                name="title"
                placeholder="Qual a atividade?"
                className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
                value={editDestination}
                onChange={(event) => setEditDestination(event.target.value)}
              />
            </div>
            <button
              onClick={openDatePicker}
              className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2 w-full"
            >
              <Calendar className="size-5 text-zinc-400" />
              <span className="text-lg text-zinc-400">
                {formattedDate || "Quando?"}
              </span>
            </button>
          </div>
          <Button type="submit" size="full" onClick={handleSave}>
            Salvar alterações
          </Button>
        </div>
        {isDatePickerOpen && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
            <div className="rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h2 className="font-lg font-semibold">Selecione a data</h2>
                  <button>
                    <X
                      className="size-5 text-zinc-400"
                      onClick={closeDatePicker}
                    />
                  </button>
                </div>
              </div>
              <DayPicker
                mode="range"
                selected={eventStartAndEndDates}
                onSelect={setEventStartAndEndDates}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
