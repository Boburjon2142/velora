import { ArrowRight, Building2, MapPin, ShieldCheck, TramFront, UtensilsCrossed } from 'lucide-react';

import { seedState } from '@/features/data/seed';
import { ButtonLink } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PageShell } from '@/components/page-shell';
import { SectionHeading } from '@/components/section-heading';
import { Separator } from '@/components/ui/separator';

const highlights = [
  { icon: ShieldCheck, title: 'Aniq baholash va ochiq izohlar', text: 'Hudud nima uchun mos kelishini tushuntiradigan shaffof mantiq.' },
  { icon: TramFront, title: 'Transportga tayangan tanlov', text: 'Realistik transport, aeroport va piyoda yurish qulayligi bilan hududlarni tanlang.' },
  { icon: UtensilsCrossed, title: 'Ovqat va amaliy xizmatlar', text: "Halol ovqat, dorixona, bankomat va kundalik qulayliklarni bir joyda ko'ring." },
  { icon: MapPin, title: 'Hudud xaritasida aniqlik', text: "Moslashuvchan filtrlar va foydali belgilar bilan stay zonalarni o'rganing." }
];

export default function HomePage() {
  const featuredCities = seedState.cities;
  const featuredNeighborhoods = seedState.neighborhoods.slice(0, 6);

  return (
    <>
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-hero-fade opacity-95" />
        <div className="absolute inset-0 hero-grid opacity-25" />
        <PageShell className="relative py-16 sm:py-20 lg:py-28">
          <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="max-w-3xl">
              <Badge className="border-cyan-300/20 bg-cyan-300/10 text-cyan-100">Rasmiy sayohat qulayligi rejalashtiruvchisi</Badge>
              <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-7xl">
                Har bir shaharda qolish uchun eng qulay hududni toping.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-200 sm:text-lg">
                Velora sayyohlarga xavfsizlik, transport, ovqat, byudjet, madaniy yaqinlik va safar maqsadiga mos holda
                yashash hududini tanlashga yordam beradi.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href="/discover" className="gap-2">
                  Shaharni tanlash <ArrowRight className="h-4 w-4" />
                </ButtonLink>
                <ButtonLink href="/compare" variant="secondary">
                  Hududlarni taqqoslash
                </ButtonLink>
              </div>
              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {[
                  ['4 ta shahar', "O'zbekistonning asosiy turizm shaharlariga doir ishonchli ma'lumotlar"],
                  ['16 ta hudud', "Taqqoslash va tavsiyalar uchun yetarli zichlikdagi ma'lumotlar"],
                  ['Saqlash', "Sevimlilar, marshrutlar va qidiruv tarixi tizimga kirgan foydalanuvchilar uchun"]
                ].map(([title, text]) => (
                  <Card key={title} className="border-white/10 bg-white/5">
                    <CardContent className="p-5">
                      <div className="text-2xl font-semibold text-white">{title}</div>
                      <p className="mt-2 text-sm leading-6 text-slate-400">{text}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <Card className="border-cyan-400/15 bg-slate-950/60 shadow-glow">
              <CardHeader>
                <CardTitle>Qulay joy tanlashning eng tez yo'li</CardTitle>
                <CardDescription>
                  Shahar, sayohatchi turi va ustuvorliklarni kiriting. Platforma eng yaxshi hududlarni tartiblab,
                  afzallik va cheklovlarni tushunarli tarzda ko'rsatadi.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {highlightSummary(featuredCities[0], featuredCities[1], featuredCities[2])}
                <div className="grid gap-3 sm:grid-cols-2">
                  {highlights.slice(0, 2).map((item) => (
                    <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <item.icon className="h-5 w-5 text-cyan-300" />
                      <div className="mt-3 text-sm font-medium text-white">{item.title}</div>
                      <div className="mt-2 text-sm leading-6 text-slate-400">{item.text}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </PageShell>
      </section>

      <PageShell className="py-16">
        <SectionHeading
          eyebrow="Qanday ishlaydi"
          title="Qidiruvdan yashash hududi tanlovigacha tartibli jarayon"
          description="Platforma sayohatchi ustuvorliklarini reytinglangan hududlar, byudjet hisoblari, xaritalar va marshrutlarga aylantiradi."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-4">
          {[
            ['1', "Safar ma'lumotlarini kiriting", "Shahar, sana, byudjet darajasi, sur'at va ustuvorliklarni tanlang."],
            ['2', 'Hududlarni reytinglash', 'Dvigatel qulaylik modeliga tayangan holda hududlarni baholaydi.'],
            ['3', "Farqlarni ko'ring", "Nega bir hudud boshqasidan mosroq ekanini tushunib oling."],
            ['4', 'Saqlang va rejalashtiring', 'Bitta akkauntda sevimlilar, marshrutlar va taqqoslashlarni yarating.']
          ].map(([step, title, text]) => (
            <Card key={title} className="border-white/10 bg-white/5">
              <CardContent className="p-6">
                <div className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">Bosqich {step}</div>
                <div className="mt-3 text-lg font-semibold text-white">{title}</div>
                <p className="mt-2 text-sm leading-6 text-slate-400">{text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </PageShell>

      <section className="border-y border-white/10 bg-slate-950/70">
        <PageShell className="py-16">
          <SectionHeading
            eyebrow="Tanlangan shaharlar"
            title="Jonli taqdimot uchun ishonchli boshlang'ich tarmoq"
            description="Har bir shahar sahifasida hududlar, byudjet oraliqlari, transport izohlari va sayohatchi bo'yicha yo'nalishlar bor."
          />
          <div className="mt-8 grid gap-5 lg:grid-cols-4">
            {featuredCities.map((city) => (
              <Card key={city.slug} className="group overflow-hidden border-white/10 bg-white/5">
                <CardContent className="p-0">
                  <div className="aspect-[4/3] bg-gradient-to-br from-slate-800 via-slate-900 to-cyan-950 p-5">
                    <div className="flex h-full flex-col justify-between rounded-3xl border border-white/10 bg-white/5 p-5">
                      <div className="flex items-center justify-between">
                        <Building2 className="h-5 w-5 text-cyan-300" />
                        <Badge>{city.country}</Badge>
                      </div>
                      <div>
                        <div className="text-2xl font-semibold text-white">{city.name}</div>
                        <div className="mt-2 text-sm leading-6 text-slate-300">{city.heroTagline}</div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4 p-5">
                    <p className="text-sm leading-6 text-slate-400">{city.overview}</p>
                    <div className="flex items-center justify-between">
                      <div className="text-xs uppercase tracking-[0.25em] text-slate-500">Kunlik byudjet</div>
                      <div className="text-sm text-white">{city.averageDailyBudget.balanced}/kun balansli</div>
                    </div>
                    <ButtonLink href={`/cities/${city.slug}`} variant="secondary" className="w-full">
                      Shahar profilini ochish
                    </ButtonLink>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </PageShell>
      </section>

      <PageShell className="py-16">
        <SectionHeading
          eyebrow="Tanlangan hududlar"
          title="Turli qulaylik profillariga ega amaliy yashash hududlari"
          description="Bu hududlar reyting, taqqoslash, xarita va marshrut rejalash uchun yetarlicha batafsil ma'lumotga ega."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {featuredNeighborhoods.map((neighborhood) => {
            const city = seedState.cities.find((item) => item.slug === neighborhood.citySlug);
            return (
              <Card key={neighborhood.slug} className="border-white/10 bg-white/5">
                <CardHeader>
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <CardTitle>{neighborhood.name}</CardTitle>
                      <CardDescription>{city?.name}</CardDescription>
                    </div>
                    <Badge>{neighborhood.priceTier}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm leading-6 text-slate-300">{neighborhood.summary}</p>
                  <div className="flex flex-wrap gap-2">
                    {neighborhood.bestFor.map((item) => (
                      <Badge key={item} className="border-white/10 bg-white/5 text-slate-200">
                        {item}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">Qulaylik darajasi</span>
                    <span className="font-medium text-cyan-200">{neighborhood.scores.safety + neighborhood.scores.transport > 170 ? 'Yuqori' : 'Kuchli'}</span>
                  </div>
                  <ButtonLink href={`/neighborhoods/${neighborhood.slug}`} variant="secondary" className="w-full">
                    Hududni ko'rish
                  </ButtonLink>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </PageShell>

      <section className="border-y border-white/10 bg-slate-950/70">
        <PageShell className="py-16">
          <SectionHeading
            eyebrow="Qulaylik bahosi"
            title="Qora quti emas, ochiq ko'rsatkichlar"
            description="Tavsiyalar modeli sayohatchi ustuvorliklari va hudud signallarini birlashtirib, reyting bilan birga farqlarni ham ko'rsatadi."
          />
          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            <Card className="border-white/10 bg-white/5">
              <CardHeader>
                <CardTitle>Baho nimalarni o'z ichiga oladi</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3 sm:grid-cols-2">
                {[
                  'Xavfsizlik',
                  'Transport',
                  'Piyoda qulaylik',
                  'Ovqat topish',
                  'Turizm yaqinligi',
                  'Byudjetga moslik',
                  'Oila uchun qulaylik',
                  'Sokinlik'
                ].map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
                    {item}
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card className="border-white/10 bg-white/5">
              <CardHeader>
                <CardTitle>Nega ishonchli</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm leading-6 text-slate-300">
                <p>U tartibli, tushunarli va jonli taqdimotda oson tekshiriladi.</p>
                <Separator />
                <p>Har bir tavsiya faqat maqtamaydi, balki kuchli va zaif tomonlarni ham ko'rsatadi.</p>
                <Separator />
                <p>Byudjet, marshrut, taqqoslash va xarita bir xil shahar ma'lumotlariga tayangan.</p>
              </CardContent>
            </Card>
          </div>
        </PageShell>
      </section>

      <PageShell className="py-16">
        <SectionHeading eyebrow="Fikrlar" title="Ishonchli safar rejalash uchun" />
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {seedState.testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="border-white/10 bg-white/5">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-white">{testimonial.name}</div>
                    <div className="text-xs uppercase tracking-[0.24em] text-slate-500">{testimonial.title}</div>
                  </div>
                  <div className="text-sm text-cyan-200">{'в…'.repeat(testimonial.rating)}</div>
                </div>
                <p className="mt-4 text-sm leading-6 text-slate-300">вЂњ{testimonial.quote}вЂќ</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </PageShell>

      <PageShell className="pb-20">
        <SectionHeading eyebrow="FAQ" title="Birinchi marta foydalanuvchilar uchun javoblar" />
        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {[
            ["Hududlarni yonma-yon taqqoslash mumkinmi?", "Ha. Taqqoslash sahifasi baho, byudjet, transport, ovqat va oila mosligini birga ko'rsatadi."],
            ["Saqlash uchun kirish kerakmi?", "Ha. Saqlangan hududlar, marshrutlar va qidiruv tarixi foydalanuvchi akkauntiga bog'lanadi."],
            ["Xarita interaktivmi?", "Ha. Hudud sahifalarida filtrlash mumkin bo'lgan xarita mavjud."],
            ["Admin panel ma'lumotlarni tahrirlay oladimi?", "Ha. Ruxsatli adminlar shahar, hudud, baho, narx va yorliqlarni o'zgartira oladi."]
          ].map(([question, answer]) => (
            <Card key={question} className="border-white/10 bg-white/5">
              <CardHeader>
                <CardTitle>{question}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-6 text-slate-400">{answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </PageShell>
    </>
  );
}

function highlightSummary(cityA: (typeof seedState.cities)[number], cityB: (typeof seedState.cities)[number], cityC: (typeof seedState.cities)[number]) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
      <div className="text-sm font-medium text-white">Tayyorlangan shahar tarmog'i</div>
      <div className="mt-3 space-y-3 text-sm text-slate-400">
        <div className="flex items-center justify-between">
          <span>{cityA.name}</span>
          <span>{cityA.comfortSummary}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>{cityB.name}</span>
          <span>{cityB.comfortSummary}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>{cityC.name}</span>
          <span>{cityC.comfortSummary}</span>
        </div>
      </div>
    </div>
  );
}

