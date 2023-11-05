import Image from 'next/image'
import Link  from 'next/link'
import { Button } from '@radix-ui/themes'

export default function Home() {
  return (
    <Button>
      <Link href='issues/new'>New Issue</Link>
    </Button>
  )
}
