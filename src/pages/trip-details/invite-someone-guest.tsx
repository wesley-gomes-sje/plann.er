import { AtSign, SendHorizonal, X } from "lucide-react";
import { Button } from "../../components/button";
import { FormEvent } from "react";

interface InviteSomeoneGuestProps {
  closeInviteSomeoneGuest: () => void;
  sendInvite: (event: FormEvent<HTMLFormElement>) => void;
}

export function InviteSomeoneGuest({
  closeInviteSomeoneGuest,
  sendInvite,
}: InviteSomeoneGuestProps) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Faça um novo convite</h2>
            <button type="button" onClick={closeInviteSomeoneGuest}>
              <X className="size-5 text-zinc-400" />
            </button>
          </div>
          <p className="text-sm text-zinc-400">
            O convidado irá receber um e-mail para confirmar a participação na
            viagem.
          </p>
        </div>
        <div className="w-full h-px bg-zinc-800"></div>

        <form
          onSubmit={sendInvite}
          className="p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2"
        >
          <div className="px-2 flex items-center flex-1 gap-2">
            <AtSign className="size-5 text-zinc-400" />
            <input
              type="email"
              name="email"
              placeholder="Digite o email do convidado"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
            />
          </div>
          <Button>
            Convidar
            <SendHorizonal className="size-5" />
          </Button>
        </form>
      </div>
    </div>
  );
}
