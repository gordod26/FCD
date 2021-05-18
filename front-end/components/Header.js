import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/client";

export default function Header() {
  const [session, loading] = useSession();
  return (
    <header>
      <nav>
        <h1>Fellowship of Christian Developers</h1>
        <ul>
          <li>
            <Link href="/about">
              <a>About</a>
            </Link>
          </li>
          <li>
            <Link href="/">
              <a>Discussion</a>
            </Link>
          </li>
          <li>
            <Link href="/openSource">
              <a>OpenSource</a>
            </Link>
          </li>
          <li>
            <Link href="/submitNewsPost">
              <a>Share</a>
            </Link>
          </li>
        </ul>
        {!session && (
          <>
            Not signed in <br />
            <button onClick={signIn}>Sign In</button>
          </>
        )}
        {session && (
          <>
            Signed in as {session.user.email}
            <br />
            {
              //<div>You can now access our super secret pages</div>
              //<button>
              //<Link href="/secret">To the secret</Link>
              //</button>
            }
            <button onClick={signOut}>sign out</button>
          </>
        )}
      </nav>
    </header>
  );
}
