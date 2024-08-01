"use client"
import { useRef, useState } from 'react';
import packageJson from '../package.json'
import TableComponent from '@/components/page/TableComponent';
import { UploadIcon } from '@/components/utils/icons';

export default function Home() {

  const fileRef = useRef(null)
  const [submit,onSubmit] =useState(false)


  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit(false)
    if (!fileRef.current?.files) {
      throw new Error("No file selected");
    }
    const file = fileRef.current.files[0];
    if(file.size >= 5000000){
      alert("This file exceeds 5MB of storage, please choose another one")
    }else{
      await fetch(`/api/file?filename=${file.name}`, {
        method: "POST",
        body: file,
      });
      onSubmit(true)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className='flex flex-row justify-around items-center m-auto w-[80vw] h-[80vh]'>
        <section>
          <h3 className='font-bold'>
            POC Blob storage v{packageJson.version}
          </h3>
          <br></br>
          <div>
            <form onSubmit={(e) => handleSubmit(e)} className="space-y-8">
              <input name="file" ref={fileRef} type="file" required />
              <br></br>
              <button type="submit" className='flex flex-row justify-center w-24 px-1 bg-white rounded-2xl p-1'>Upload <UploadIcon/></button>
            </form>
          </div>
        </section>
        <section>
          <TableComponent onUpload={submit} />
        </section>
      </div>
    </main>
  );
}
