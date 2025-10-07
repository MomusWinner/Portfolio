import { fetchGetAdmin, getLocalDateTimeString } from "@/helper";
import { Alias } from "@/models";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DeleteButton from "./DeleteButton";

interface Props {
  aliases: Alias[];
  onDelete: (alias: Alias) => void;
}

export default function AliasList({ aliases, onDelete }: Props) {
  return (
    <div className="space-y-4 w-full min-w-200">
      <div className="space-y-3">
        {aliases &&
          aliases.map((alias) => (
            <div
              key={alias.id}
              className="flex justify-between items-center bg-background border border-foreground p-4 rounded-2xl"
            >
              <div>
                <h2 className="text-lg font-semibold">{alias.id.slice(1, 15) + "..."}</h2>
              </div>
              <p>
                Tag: <span className="text-m-green">{alias.tag}</span>
              </p>
              <p>
                Alias: <span className="text-m-green">{alias.alias}</span>
              </p>
              <DeleteButton
                onClick={() => {
                  onDelete(alias);
                }}
              >
                Delete
              </DeleteButton>
            </div>
          ))}
      </div>
    </div>
  );
}
