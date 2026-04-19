'use client';

import { useMutation } from '@tanstack/react-query';
import { Bookmark } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';

export function SaveNeighborhoodButton({ slug }: { slug: string }) {
  const mutation = useMutation({
    mutationFn: async () => {
      const response = await fetch('/api/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ neighborhoodSlug: slug })
      });
      if (!response.ok) throw new Error('Unable to save neighborhood');
      return response.json();
    },
    onSuccess() {
      toast.success('Neighborhood saved');
    },
    onError() {
      toast.error('Please sign in to save neighborhoods');
    }
  });

  return (
    <Button onClick={() => mutation.mutate()} disabled={mutation.isPending} variant="secondary" className="gap-2">
      <Bookmark className="h-4 w-4" />
      {mutation.isPending ? 'Saving...' : 'Save to favorites'}
    </Button>
  );
}
