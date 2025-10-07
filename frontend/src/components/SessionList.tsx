import { fetchDeleteAdmin, fetchGetAdmin, getLocalDateTimeString } from "@/helper";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import DeleteButton from "./DeleteButton";
import { Session } from "@/models";

type SessionItmeProps = {
  session: Session;
  onDelete: (session: Session) => void;
};

function SessionItem({ session, onDelete }: SessionItmeProps) {
  return (
    <div className="flex justify-between items-center bg-background border border-foreground p-4 rounded-2xl">
      <div>
        <h2 className="text-lg font-semibold">
          <Link href={"admin/session/" + session.id}>{session.id.slice(0, 10) + "..."}</Link>
        </h2>
        <p className="text-m-gray text-sm">{session.ip}</p>
      </div>

      <div>
        <p>{session.tag ?? "---"}</p>
        <p>{session.alias ?? "---"} </p>
      </div>
      <p>{getLocalDateTimeString(new Date(session.createdAt))}</p>

      <span className="text-green-400 font-bold">{session.totalTime?.toString()}</span>
      <DeleteButton
        onClick={() => {
          onDelete(session);
        }}
      >
        Delete
      </DeleteButton>
    </div>
  );
}

export default function SessionList() {
  const [sessions, setSessions] = useState<Session[] | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchSession() {
      var sessions = await fetchGetAdmin<Session[]>("/api/v1/session", router);
      setSessions(sessions);
    }

    fetchSession();
  }, [setSessions]);

  async function deleteSession(session: Session) {
    var res = await fetchDeleteAdmin("/api/v1/session/" + session.id, router);
    if (!res) return;
    if (res.status === 200) {
      if (!sessions) return;

      const index = sessions.findIndex((s) => {
        return s.id === session.id;
      }, 0);
      var s = [...sessions];
      console.log(index);
      if (index > -1) {
        s.splice(index, 1);
        setSessions(s);
      }
    }
  }

  return (
    <div className="space-y-4 w-full min-w-200">
      <div className="space-y-3">
        {sessions &&
          sessions.map((session) => (
            <SessionItem key={session.id} session={session} onDelete={deleteSession} />
          ))}
      </div>
    </div>
  );
}

//{/* SessionItem(session) */ }
//{/* <SessionItem session={session}> */ }
