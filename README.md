import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Ticket, Gift, Sparkles, Leaf, Mail, Info, ChevronRight, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

// --- Mock data ---
const products = [
  {
    id: "gaudi-mosaic-truffle",
    name: "Mosaic Truffle Collection",
    tagline: "食べられる建築、美術館限定カラー",
    price: 3200,
    badge: "Seasonal",
    image:
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476b?q=80&w=1600&auto=format&fit=crop",
    description:
      "ガウディのタイルを思わせる幾何学モザイクを薄いコーティングで表現。6粒入り。",
    notes: ["70%カカオ", "ベルガモット", "ヘーゼルナッツ・プラリネ"],
  },
  {
    id: "fluid-curves-bar",
    name: "Fluid Curves Bar",
    tagline: "曲線の愉悦、口どけの建築",
    price: 1800,
    badge: "New",
    image:
      "https://images.unsplash.com/photo-1582562124811-c09040d0c4b5?q=80&w=1600&auto=format&fit=crop",
    description:
      "サグラダ・ファミリアの有機的な曲線を型取りした板チョコ。ハイカカオとシトラスの余韻。",
    notes: ["72%カカオ", "オレンジピール", "海塩"],
  },
  {
    id: "stained-glass-bonbon",
    name: "Stained Glass Bonbon",
    tagline: "光を閉じ込めた一粒の窓",
    price: 2800,
    badge: "Limited",
    image:
      "https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=1600&auto=format&fit=crop",
    description:
      "ステンドグラスの彩りをカカオバターで描いたボンボンショコラ。8粒入り。",
    notes: ["ラズベリー", "ピスタチオ", "カモミール"],
  },
];

export default function GaudiChocolateMuseum() {
  const [selected, setSelected] = useState(null as null | typeof products[number]);
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      {/* Top bar */}
      <div className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b border-neutral-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-full bg-gradient-to-tr from-amber-400 via-rose-400 to-sky-400" />
            <span className="font-semibold tracking-wide">Gaudí Chocolate Museum</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" className="gap-2"><Palette className="h-4 w-4"/>Exhibition</Button>
            <Button variant="ghost" className="gap-2"><Gift className="h-4 w-4"/>Gifts</Button>
            <Button className="gap-2 rounded-2xl"><ShoppingCart className="h-4 w-4"/> Cart</Button>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Mosaic background */}
        <MosaicBg />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-6xl font-extrabold tracking-tight"
          >
            食べられる建築。
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-rose-500 to-sky-500">
              口の中で溶ける芸術展。
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-6 max-w-2xl text-lg text-neutral-700"
          >
            ガウディの色彩と曲線をショコラで描く、オンライン限定のミュージアム。季節ごとに入れ替わる展示を、あなたの食卓へ。
          </motion.p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" className="rounded-2xl gap-2">
                  <Ticket className="h-4 w-4"/> 今季の展示を予約購入
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle>今季の展示ボックス – 先行予約</DialogTitle>
                </DialogHeader>
                <p className="text-sm text-neutral-600">限定カラーのモザイクトリュフ＋ステンドグラスボンボンの詰め合わせ。お届けは11月上旬予定。</p>
                <Button className="mt-4 rounded-2xl w-full">予約する（¥3,800）</Button>
              </DialogContent>
            </Dialog>
            <a href="#exhibition" className="inline-flex items-center gap-2 text-neutral-800 hover:text-neutral-900 font-medium">
              コレクションを見る <ChevronRight className="h-4 w-4"/>
            </a>
          </div>
        </div>
      </section>

      {/* Exhibition Grid */}
      <section id="exhibition" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight flex items-center gap-2"><Sparkles className="h-5 w-5"/> 本日の展示</h2>
            <p className="text-neutral-600 mt-2">ガウディのモザイク、曲線、光。三つのテーマで構成された限定ショコラ。</p>
          </div>
          <Button variant="outline" className="rounded-2xl">全コレクション</Button>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p, i) => (
            <motion.div key={p.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <Card className="rounded-2xl overflow-hidden border-neutral-200 hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img src={p.image} alt={p.name} className="h-56 w-full object-cover"/>
                  {p.badge && (
                    <span className="absolute top-3 left-3 text-xs bg-white/90 backdrop-blur px-2 py-1 rounded-full border border-neutral-200">{p.badge}</span>
                  )}
                </div>
                <CardHeader>
                  <CardTitle className="flex items-start justify-between">
                    <div>
                      <div className="text-lg font-semibold">{p.name}</div>
                      <div className="text-sm text-neutral-600 mt-1">{p.tagline}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">¥{p.price.toLocaleString()}</div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-neutral-700">{p.description}</p>
                  <ul className="mt-3 flex flex-wrap gap-2 text-xs text-neutral-600">
                    {p.notes.map((n) => (
                      <li key={n} className="px-2 py-1 rounded-full bg-neutral-100 border border-neutral-200">{n}</li>
                    ))}
                  </ul>
                  <div className="mt-4 flex gap-2">
                    <Button className="rounded-2xl flex-1" onClick={() => setSelected(p)}>
                      作品を見る
                    </Button>
                    <Button variant="secondary" className="rounded-2xl"><ShoppingCart className="h-4 w-4"/></Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Story / Concept */}
      <section className="bg-white border-y border-neutral-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">コンセプト – 食べられる建築</h3>
            <p className="mt-4 text-neutral-700 leading-relaxed">
              曲線、光、そして色彩。カカオのテクスチャーと天然色素で、ガウディの建築言語をショコラとして翻訳しました。季節ごとに展示替えを行い、オンラインだけの美術館体験をお届けします。
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Tag icon={<Sparkles className="h-3.5 w-3.5"/>}>限定カラー</Tag>
              <Tag icon={<Leaf className="h-3.5 w-3.5"/>}>天然色素</Tag>
              <Tag icon={<Gift className="h-3.5 w-3.5"/>}>ギフト対応</Tag>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1566802847242-9751eac8b55c?q=80&w=1600&auto=format&fit=crop"
              alt="Gaudí inspired chocolate collage"
              className="w-full h-80 object-cover rounded-3xl shadow-md"
            />
            <div className="absolute -bottom-4 -right-4 bg-white/80 border border-neutral-200 rounded-2xl px-4 py-3 shadow-sm">
              <div className="text-xs text-neutral-600">Online Only Exhibition</div>
              <div className="text-sm font-semibold">Season 01 – Mosaic</div>
            </div>
          </div>
        </div>
      </section>

      {/* Email capture */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="relative overflow-hidden rounded-3xl border border-neutral-200 bg-gradient-to-tr from-amber-50 via-rose-50 to-sky-50 p-8">
          <div className="max-w-2xl">
            <h4 className="text-xl sm:text-2xl font-bold tracking-tight flex items-center gap-2"><Mail className="h-5 w-5"/> ミュージアムレターに登録</h4>
            <p className="mt-2 text-neutral-700 text-sm">先行予約や限定カラーの公開情報をメールで受け取る。</p>
            <div className="mt-4 flex gap-3 max-w-md">
              <Input placeholder="you@example.com" value={email} onChange={(e)=>setEmail(e.target.value)} className="rounded-2xl"/>
              <Button className="rounded-2xl">登録</Button>
            </div>
          </div>
          <div className="pointer-events-none absolute -right-24 -bottom-24 opacity-60">
            <MiniTiles />
          </div>
        </div>
      </section>

      {/* FAQ / Info */}
      <section className="bg-white border-t border-neutral-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 grid md:grid-cols-3 gap-8">
          <InfoCard
            icon={<Info className="h-5 w-5"/>}
            title="品質について"
            text="冷涼期は常温配送、夏期はクール便にてお届けします。アレルギー表示を同梱のカードに記載。"
          />
          <InfoCard
            icon={<Gift className="h-5 w-5"/>}
            title="ギフト仕様"
            text="無料メッセージカードとミュージアム封筒。手提げ袋（有料）もご用意。"
          />
          <InfoCard
            icon={<Ticket className="h-5 w-5"/>}
            title="展示予約"
            text="限定カラーは予約優先。売切れ次第、次シーズンへ展示替えします。"
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-200 bg-neutral-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-neutral-600">© {new Date().getFullYear()} Gaudí Chocolate Museum. All rights reserved.</div>
          <div className="flex items-center gap-3 text-sm">
            <a className="hover:underline" href="#">特定商取引法に基づく表記</a>
            <span>·</span>
            <a className="hover:underline" href="#">プライバシーポリシー</a>
            <span>·</span>
            <a className="hover:underline" href="#">FAQ</a>
          </div>
        </div>
      </footer>

      {/* Product Dialog */}
      <AnimatePresence>
        {selected && (
          <Dialog open onOpenChange={() => setSelected(null)}>
            <DialogContent className="sm:max-w-2xl">
              <DialogHeader>
                <DialogTitle>{selected.name}</DialogTitle>
              </DialogHeader>
              <div className="grid md:grid-cols-2 gap-6">
                <img src={selected.image} alt={selected.name} className="w-full h-64 object-cover rounded-xl"/>
                <div>
                  <p className="text-sm text-neutral-700">{selected.description}</p>
                  <ul className="mt-3 flex flex-wrap gap-2 text-xs text-neutral-600">
                    {selected.notes.map((n) => (
                      <li key={n} className="px-2 py-1 rounded-full bg-neutral-100 border border-neutral-200">{n}</li>
                    ))}
                  </ul>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="text-lg font-semibold">¥{selected.price.toLocaleString()}</div>
                    <Button className="rounded-2xl"><ShoppingCart className="h-4 w-4"/> カートに入れる</Button>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  );
}

function Tag({ children, icon }: { children: React.ReactNode; icon?: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-neutral-200 bg-neutral-50 text-xs text-neutral-700">
      {icon} {children}
    </span>
  );
}

function InfoCard({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <Card className="rounded-2xl">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-base"><span className="text-neutral-700">{icon}</span> {title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-neutral-600">{text}</p>
      </CardContent>
    </Card>
  );
}

// Decorative background components
function MosaicBg() {
  return (
    <div aria-hidden className="absolute inset-0">
      <svg className="absolute -top-24 -right-24 w-[44rem] opacity-30" viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg">
        {Array.from({ length: 120 }).map((_, i) => {
          const x = (i % 12) * 50 + (i % 2 === 0 ? 10 : 0);
          const y = Math.floor(i / 12) * 50 + (i % 3 === 0 ? 8 : 0);
          const r = 8 + ((i * 7) % 14);
          const colors = ["#F59E0B", "#F43F5E", "#0EA5E9", "#A3E635", "#F97316", "#22C55E"]; // amber, rose, sky, lime, orange, emerald
          const c = colors[i % colors.length];
          return <circle key={i} cx={x} cy={y} r={r} fill={c} />;
        })}
      </svg>
    </div>
  );
}

function MiniTiles() {
  return (
    <svg width="400" height="400" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
      {Array.from({ length: 90 }).map((_, i) => {
        const size = 16 + (i % 4) * 6;
        const x = (i * 37) % 360;
        const y = (i * 53) % 360;
        const colors = ["#F59E0B", "#F43F5E", "#0EA5E9", "#10B981"]; // amber, rose, sky, emerald
        const c = colors[(i + 2) % colors.length];
        const rotate = (i * 17) % 360;
        return (
          <rect
            key={i}
            x={x}
            y={y}
            width={size}
            height={size}
            transform={`rotate(${rotate} ${x + size / 2} ${y + size / 2})`}
            rx={4}
            fill={c}
            opacity={0.6}
          />
        );
      })}
    </svg>
  );
}
