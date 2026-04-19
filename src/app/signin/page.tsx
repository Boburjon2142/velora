'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function SignInPage() {
  const router = useRouter();
  const params = useSearchParams();
  const callbackUrl = params.get('callbackUrl') ?? '/';
  const [pending, setPending] = useState(false);

  async function handleSubmit(formData: FormData) {
    setPending(true);
    const result = await signIn('credentials', {
      email: String(formData.get('email') ?? ''),
      password: String(formData.get('password') ?? ''),
      callbackUrl,
      redirect: false
    });
    setPending(false);

    if (result?.error) {
      toast.error('Sign-in failed. Please check your credentials.');
      return;
    }

    toast.success('Signed in successfully');
    router.push((callbackUrl.startsWith('/') ? callbackUrl : '/') as never);
    router.refresh();
  }

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-7xl items-center px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="grid w-full gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-6">
          <div className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300">Tizimga kirish</div>
          <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">
            Hududlar, marshrutlar va taqqoslashlarni saqlash uchun tizimga kiring.
          </h1>
          <p className="max-w-xl text-sm leading-7 text-slate-400">
            Kirgan foydalanuvchilar qidiruvlarni qayta ko'rishi, sevimlilarni saqlashi va ruxsati bo'lsa admin
            ish maydoniga kirishi mumkin.
          </p>
        </div>
        <Card className="border-white/10 bg-white/5">
          <CardHeader>
            <CardTitle>Kirish</CardTitle>
            <CardDescription>Mahalliy muhit sozlamalarida berilgan ma'lumotlardan foydalaning.</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={handleSubmit} className="space-y-5">
              <div>
                <Label>Email</Label>
                <Input name="email" type="email" placeholder="••••••••" required />
              </div>
              <div>
                <Label>Parol</Label>
                <Input name="password" type="password" placeholder="••••••••" required />
              </div>
              <Button type="submit" disabled={pending} className="w-full">
                {pending ? 'Kirish amalga oshirilmoqda...' : 'Davom etish'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

