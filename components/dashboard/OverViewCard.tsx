import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { analyticsProps } from "@/types/types"





export function OverviewCard({
  title,
  total,
  href,
  icon,
  isCurrency
}: analyticsProps) {
    const Icon = icon
  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <p className="text-sm font-medium text-muted-foreground">
            {title}
          </p>

          <div className="rounded-md border p-2 text-muted-foreground">
            <Icon className="h-4 w-4" />
          </div>
        </div>

        <div className="mt-2 text-2xl font-bold">
         {isCurrency ? `$${total}` :    total}   
        </div>

        <Link
          href={href}
          className="mt-1 inline-block text-sm text-muted-foreground hover:underline"
        >
          View Details
        </Link>
      </CardContent>
    </Card>
  )
}
