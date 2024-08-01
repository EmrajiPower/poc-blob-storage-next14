import { useEffect, useLayoutEffect, useState, memo } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { DownloadIcon, DeleteIcon } from '@/components/utils/icons';
import { bytesToMegabytes } from "../utils/math";
import { STORE_BLOBS } from "@/app/reducers/types";
import { useAppContext } from "@/app/provider";

function TableComponent({onUpload}) {

    //Global/persist state
    const { state, dispatch } = useAppContext();

    // API loading state
    const [loading, setLoading] = useState(true)
    // Helper for API loading state, it's for improve the behaviour when page is loaded and avoid showing other UI elements
    const [progress, setProgress] = useState(false)

    const getBlobs = async () => {
        setLoading(true)
        setProgress(true)
        try {
            const response = await fetch('/api/file');
            const data = await response.json();
            if(data){
                await dispatch({
                    type: STORE_BLOBS,
                    payload: data.blobs,
                });
            }
        } catch (error) {
            console.log("[Error] fetching blobs ",error)
        }
        setLoading(false)
        setProgress(false)
    }

    useLayoutEffect(() => {
        setProgress(false)
        getBlobs()
    }, [])

    useEffect(() => {
        // It's an incremental backoff simulation, in case of requesting too fast
        setTimeout(()=>{
            getBlobs()
        },100)
    }, [onUpload])

        //Se actualiza ele estado global del componente cada vez que ve el usuario realiza un voto
    useEffect(() => {
        if (state?.blobs) {
            console.log("[Success] Blobs info ",state.blobs)
        }
    }, [state.blobs]);

    const onDelete = async (data) => {
        setProgress(true)
        await fetch(`/api/file?url=${data.url}`, {
            method: "DELETE",
            body: data,
          });
        await getBlobs()
        setProgress(false)
    }

    return (
        <>
            {/* Loading state */}
            {loading && !progress &&
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
            {state?.blobs !== null && state.blobs.length !== 0 &&
            <div className="flex relative">
                        {loading || progress && <div
  class="absolute z-[2] left-[45%] top-1/2 inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current blur-none border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
  role="status">
  </div>}
                <Table className="bg-white rounded-xl h-[50vh] w-[35vw]">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Name</TableHead>
                            <TableHead>size</TableHead>
                            <TableHead className="text-left">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className={`h-[20vh] max-h-[30vh] overflow-y-auto overflow-x-auto ${loading || progress && "blur-md"}`}>
                        {state.blobs && state.blobs.map((d,i) => {
                            return <TableRow key={i}>
                                <TableCell className="font-medium">{d.pathname}</TableCell>
                                <TableCell>{bytesToMegabytes(d.size)}</TableCell>
                                <TableCell className="text-right">
                                    <section className="flex flex-row">
                                        <a href={`${d.downloadUrl}`}><DownloadIcon/></a>
                                        <p onClick={()=>onDelete(d)} ><DeleteIcon/></p>
                                    </section>
                                    </TableCell>
                            </TableRow>
                        })}
                    </TableBody>
                </Table></div>}
            {/* Empty state */}
              {state?.blobs && state.blobs.length == 0 && <div className="relative flex">
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

export default memo(TableComponent)
