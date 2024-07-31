import { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export default function TableComponent() {

    const [file, setFile] = useState(null)

    const getBlobs = async () => {
        const response = await fetch('/api/file');
        const data = await response.json();
        setFile(data.blobs)
    }

    useEffect(() => {
        getBlobs()
    }, [])

    return (
        <>
            {file ?
                <Table className="bg-white rounded-xl h-[50vh]">
                    <TableCaption>List of recent submitted files</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Name</TableHead>
                            <TableHead>size</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {file && file.map(({downloadUrl,pathname,size},i) => {
                            return <TableRow key={i}>
                                <TableCell className="font-medium">{pathname}</TableCell>
                                <TableCell>{size}kb</TableCell>
                                <TableCell className="text-right"><a href={`${downloadUrl}`}>Link</a></TableCell>
                            </TableRow>
                        })}
                    </TableBody>
                </Table> :
                <p>Loading ...</p>}
        </>

    )
}
