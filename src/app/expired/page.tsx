import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldX } from 'lucide-react';

export default function ExpiredPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-[420px] text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <ShieldX className="w-16 h-16 text-red-500" />
          </div>
          <CardTitle className="text-2xl">This Link Has Expired</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            This page was part of a phishing awareness simulation. In a real scenario, a link might expire for security reasons.
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            Always be cautious of unexpected login requests.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
