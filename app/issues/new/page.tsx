"use client";

import {
  Controller,
  useForm,
} from "react-hook-form";
import axios from 'axios'
import { useRouter } from "next/navigation";

import { TextField, Button } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const { register, handleSubmit, control } = useForm<IssueForm>();
  const router = useRouter()
  return (
    <form className="max-w-lg space-y-3" onSubmit={handleSubmit(async (data) => {
      await axios.post('/api/issues', data)
      router.push('/issues')
    })}>
      <TextField.Root>
        <TextField.Input placeholder="Title" {...register("title")} />
      </TextField.Root>
      <Controller
        name={"description"}
        control={control}
        render={({ field }) => <SimpleMDE placeholder="Description" {...field} />}
      />

      <Button>Submit New Issue</Button>
    </form>
  );
};

export default NewIssuePage;
