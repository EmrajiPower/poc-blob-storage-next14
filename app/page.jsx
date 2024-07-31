"use client"
import packageJson from '../package.json'
import { useForm } from "react-hook-form"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';

export default function Home() {
  const form = useForm()
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className='flex flex-row justify-around items-center m-auto w-[80vw] h-[80vh]'>
        <section>
          <div>
            POC Blob storage v{packageJson.version}
          </div>
          <div>
            <Form {...form}>
              <form className="space-y-8">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>File</FormLabel>
                      <FormControl>
                        <Input type="file" placeholder="shadcn" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is your public display name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </div>
        </section>
        <section>
          <p>Empty list</p>
        </section>
      </div>
    </main>
  );
}
