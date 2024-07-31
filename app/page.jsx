"use client"
import { useState, useRef } from 'react';
import packageJson from '../package.json'

export default function Home() {

  // const form = useForm()
  const inputFileRef = useRef(null);
  const [file,setFile] = useState(null)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!inputFileRef.current?.files) {
      throw new Error("No file selected");
    }

    const file = inputFileRef.current.files[0];
    const response = await fetch(`/api/file?filename=${file.name}`, {
      method: "POST", 
      body: file,
    });
    console.log("Ver ... ",response.json())
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className='flex flex-row justify-around items-center m-auto w-[80vw] h-[80vh]'>
        <section>
          <div>
            POC Blob storage v{packageJson.version}
          </div>
          <div>
              <form onSubmit={(e)=>handleSubmit(e)} className="space-y-8">
                <input name="file" ref={inputFileRef} type="file" required />
                <br></br>
                <button type="submit" className='bg-white rounded-2xl p-1'>Upload</button>
              </form>
          </div>
        </section>
        <section>
          <p>Empty list</p>
        </section>
      </div>
    </main>
  );
}
