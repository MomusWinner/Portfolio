'use client'

import Image from "next/image";
import { Title1, Title2, Title3 } from "@/components/Title";
import AliasList from "@/components/AliasList";
import CreateAlias from "@/components/CreateAlias";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import { fetchDeleteAdmin, fetchGetAdmin } from "@/helper";
import { Alias } from "@/models";

export default function AdminPanel() {
	const [aliases, setAliases] = useState<Alias[]>([])
	const router = useRouter();

	useEffect(() => {
		async function fetchAliases() {
			var aliases: Alias[] | null
			aliases = await fetchGetAdmin<Alias[]>("/api/v1/alias", router)
			if (aliases) {
				setAliases(aliases)
			}
		}

		fetchAliases()
	}, [setAliases])

	function addAlias(alias: Alias) {
		setAliases([...aliases, alias]);
	}

	async function deleteAlias(alias: Alias) {
		let res = await fetchDeleteAdmin("/api/v1/alias/" + alias.id, router)
		if (!res) return
		if (res.status !== 200) {
			return
		}

		setAliases([...aliases, alias]);
		var aliasesCopy = [...aliases]
		const index = aliasesCopy.findIndex((a) => { return a.id === alias.id }, 0)
		if (index > -1) {
			aliasesCopy.splice(index, 1)
			setAliases(aliasesCopy)
		}
	}

	return (
		<>
			<Title1 className="text-center w-full">Aliases</Title1>
			<CreateAlias addAlias={addAlias} />
			<AliasList aliases={aliases} onDelete={deleteAlias} />
		</>
	);
}

