'use client'

import { TextArea, TextField, Button } from "@radix-ui/themes";

const newIssuePage = () => {
  return (
    <div className="max-w-lg space-y-3">
      <TextField.Root>
        <TextField.Input placeholder="Title" />
      </TextField.Root>
      <TextArea placeholder="Description" />
      <Button>Submit New Issue</Button>
    </div>
  );
};

export default newIssuePage;
