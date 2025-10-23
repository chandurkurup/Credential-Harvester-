import LoginPage from '@/components/login-page';

export const dynamic = 'force-dynamic';

export default function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const fileName =
    typeof searchParams.file === 'string' ? searchParams.file : 'Excel';

  return <LoginPage fileName={fileName} />;
}
