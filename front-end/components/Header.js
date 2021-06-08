import { signIn, signOut, useSession } from "next-auth/client";
import { Tabs } from "@geist-ui/react";
import { useRouter } from "next/router";
import { Button, Text } from "@geist-ui/react";

export default function Header() {
  const [session, loading] = useSession();
  const router = useRouter();

  return (
    <header>
      <h1 style={{ display: "inline-block" }}>FCD</h1>
      {!session && (
        <>
          <Button auto shadow style={{ float: "right" }} onClick={signIn}>
            Sign In
          </Button>
        </>
      )}
      {session && (
        <>
          <div style={{ float: "right" }}>
            <Text p small style={{ margin: "0" }}>
              {session.user.email}
            </Text>
            <Button
              auto="true"
              shadow
              style={{ float: "right" }}
              onClick={signOut}
            >
              sign out
            </Button>
          </div>
        </>
      )}
      <nav>
        <Tabs value={router.pathname} onChange={(route) => router.push(route)}>
          <Tabs.Item label="About" value="/about" />
          <Tabs.Item label="Discussion" value="/" />
          <Tabs.Item label="Projects" value="/openSource" />
          <Tabs.Item label="Share" value="/submitNewsPost" />
        </Tabs>
      </nav>
    </header>
  );
}
