"use client";

import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { TextField, Button, Callout, Text } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { issueSchema } from "@/app/issueSchema";
import { z } from "zod";
import Spinner from "@/app/components/Spinner";

type IssueForm = z.infer<typeof issueSchema>;

const NewIssuePage = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(issueSchema),
  });
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);

  return (
    <div className="max-w-lg">
      {error && (
        <Callout.Root color="red" className="mb-6">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className="space-y-3"
        onSubmit={handleSubmit(async (data) => {
          try {
            setIsSubmit(true);
            await axios.post("/api/issues", data);
            router.push("/issues");
          } catch (err) {
            setIsSubmit(false);
            setError("An unexpected error occurred");
          }
        })}
      >
        <TextField.Root>
          <TextField.Input placeholder="Title" {...register("title")} />
        </TextField.Root>

        <Text as="p" color="red">
          {errors.title?.message}
        </Text>

        <Controller
          name={"description"}
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <Text as="p" color="red">
          {errors.description?.message}
        </Text>

        <Button disabled={isSubmit}>Submit New Issue {isSubmit && <Spinner />}</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
