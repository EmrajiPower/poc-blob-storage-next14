import { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { DownloadIcon } from '@/components/utils/icons';
import { bytesToMegabytes } from "../utils/math";

export default function TableComponent() {

    const [file, setFile] = useState(null)
    const [loading, setLoading] = useState(true)

    const getBlobs = async () => {
        setLoading(true)
        try {
            const response = await fetch('/api/file');
            const data = await response.json();
            if(data){
                setFile(data.blobs)
            }
        } catch (error) {
            console.log("Tenemos :: ",error)
            setFile([])
        }
        setLoading(false)
    }

    useEffect(() => {
        getBlobs()
    }, [])

    return (
        <>
            {/* Loading state */}
            {loading&&
                <div className="bg-gray-200 animate-pulse rounded-xl h-[50vh] w-[40vw]">
                    <div className="w-full flex">
                        <div className="w-[100px] h-6"></div>
                        <div className="w-full h-6"></div>
                        <div className="w-full text-right h-6"></div>
                    </div>
                    <div className="w-full flex">
                        <div className="w-[100px] h-6"></div>
                        <div className="w-full h-6"></div>
                        <div className="w-full text-right h-6"></div>
                    </div>
              </div>
            }
            {/* Fetched data */}
            {file !== null && file.length !== 0 &&
                <Table className="bg-white rounded-xl h-[50vh] w-[35vw]">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Name</TableHead>
                            <TableHead>size</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="h-[20vh] max-h-[30vh] overflow-y-auto overflow-x-auto">
                        {file && file.map(({downloadUrl,pathname,size},i) => {
                            return <TableRow key={i}>
                                <TableCell className="font-medium">{pathname}</TableCell>
                                <TableCell>{bytesToMegabytes(size)}</TableCell>
                                <TableCell className="text-right"><a href={`${downloadUrl}`}><DownloadIcon/></a></TableCell>
                            </TableRow>
                        })}
                    </TableBody>
                </Table>}
            {/* Empty state */}
              {file && file.length == 0 && <div className="relative flex">
            <Table className=" bg-white rounded-xl h-[5vh] w-[30vw]">
                <TableHeader>
                    <TableRow className="h-[20px]">
                        <TableHead className="w-[100px]">Name</TableHead>
                        <TableHead>size</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
            </Table>
            <div className="absolute pt-4 w-[30vw] h-[10vh] m-auto text-center bg-white text-nowrap left-2/4 -translate-x-1/2 translate-y-1/2 rounded-bl-[10px] rounded-br-[10px]">
            ⬅️ Start uploading files
            </div>
        </div>}
        </>

    )
}
