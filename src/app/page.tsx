import LoginPage from '@/components/login-page';

export const dynamic = 'force-dynamic';

export default async function Home({
  searchParams,
}: {
  // Next.js 15: searchParams is a Promise
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams; // ✅ await the promise
  const fileName = typeof sp.file === 'string' ? sp.file : 'Excel';

  return <LoginPage fileName={fileName} />;
}