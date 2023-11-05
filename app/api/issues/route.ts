import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { issueSchema } from "../../issueSchema";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const validation = issueSchema.safeParse(body);

  if (!validation.success) return NextResponse.json(validation.error.format());

  const newIssue = await prisma.issue.create({
    data: { title: body.title, description: body.description },
  });

  return NextResponse.json(newIssue);
};
