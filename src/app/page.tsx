import LoginPage from '@/components/login-page';

export default function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const fileName =
    typeof searchParams.file === 'string' ? searchParams.file : 'Excel';

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <LoginPage fileName={fileName} />
    </main>
  );
}
