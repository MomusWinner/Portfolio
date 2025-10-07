import { fetchGetAdmin, fetchPostAdmin, getLocalDateTimeString } from "@/helper";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Input from "./Input";
import Button from "./Button";
import { Alias } from "@/models";

type Props = {
  addAlias: (alias: Alias) => void;
};

export default function CreateAlias({ addAlias }: Props) {
  const [status, setStatus] = useState(<p></p>);
  const [tag, setTag] = useState("");
  const [alias, setAlias] = useState("");
  const router = useRouter();

  async function createAlias() {
    setStatus(<p></p>);
    var resp = await fetchPostAdmin("/api/v1/alias", router, {
      body: JSON.stringify({ tag: tag, alias: alias }),
    });
    if (!resp) {
      return;
    }
    if (resp.status === 201) {
      setStatus(<p className="bg-m-green"> Success</p>);
      addAlias((await resp.json()) as Alias);
    } else {
      setStatus(<p className="bg-m-red"> Error</p>);
    }
  }

  return (
    <>
      <div className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Input
          label="Tag"
          onChange={(e) => {
            setTag(e.target.value);
          }}
        ></Input>
        <Input
          label="Alias"
          onChange={(e) => {
            setAlias(e.target.value);
          }}
        ></Input>
        <Button onClick={createAlias}>Create</Button>
        {status}
      </div>
    </>
  );
}
