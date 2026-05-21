import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProfileCard() {
  return (
    <Tabs defaultValue="account" className="bg-white w-[90%] md:w-110">
      <TabsList className="grid w-full grid-cols-2 bg-white">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="bg-white">
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
              Make changes to your account here. Click save when you&apos;re
              done
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid gap-3">
              <Label htmlFor="tabs-demo-username">Username</Label>
              <Input id="tabs-demo-username" placeholder="@peduarte" />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Save changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password here
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid gap-3">
              <Label htmlFor="tabs-demo-current">Current password</Label>
              <Input id="tabs-demo-current" type="password" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="tabs-demo-new">New password</Label>
              <Input id="tabs-demo-new" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}