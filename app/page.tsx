"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export default function Home() {
  // --- Reviews ---
  const reviews = [
    { name: "Miyu S.", rating: 5, text: "小ロット製造のせいか香りが鮮烈。余計な説明がいらないおいしさでした。" },
    { name: "Alexandre T.", rating: 5, text: "造形が綺麗。甘さと酸のバランスが良く、手土産にしても評判が良かったです。" },
    { name: "Kanae M.", rating: 5, text: "配送状態も良好。個体差はあるけど、むしろ手仕事感があって好みでした。" },
    { name: "Liam R.", rating: 4, text: "後味が長く続くタイプ。写真は一例と書いてある通り、模様は少しずつ違いました。" },
    { name: "Haruka I.", rating: 5, text: "問い合わせへの返信が早くて安心。ギフト対応の案内も親切でした。" },
  ];

  // --- Auto-scroll for reviews ---
  const scrollRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = scrollRef.current;
    let x = 0;
    const speed = 0.3; // ゆっくり
    let raf = 0;
    const loop = () => {
      if (el && el.scrollWidth > el.clientWidth) {
        x = (x + speed) % el.scrollWidth;
        el.scrollTo({ left: x, behavior: "smooth" });
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Top bar */}
      <header className="sticky top-0 z-40 h-12 flex items-center px-4 bg-black/60 backdrop-blur border-b border-white/10">
        <div className="text-sm font-semibold tracking-wide">Gaudí × Chocolate — Seasonal Small Batch</div>
      </header>

      {/* HERO split */}
      <main className="grid grid-cols-1 sm:grid-cols-2">
        <HeroPanel
          src="/images/choco-gaudi-machine.jpg"
          title="曲線の美と、口どけの詩"
          body="バルセロナ在住デザイナーがモチーフ設計を担当し、ベルギーで修行した職人が配合と温度管理を担います。季節ごとに小ロットで製造。"
        />
        <HeroPanel
          src="/images/choco-gaudi-ceiling.jpg"
          title="芸術が、舌の上で解ける"
          body="モザイクや鍛鉄の意匠を、カカオの層と香りで再構築。視覚から味覚へ緩やかに接続する体験を目指しています。"
        />
      </main>

      {/* 信頼バー */}
      <TrustBar />

      {/* コラボ（アイコン） */}
      <section className="px-6 pt-10 max-w-xl mx-auto">
        <h3 className="text-xl font-semibold mb-4">共同制作について</h3>
        <div className="grid grid-cols-2 gap-4">
          <Collaborator
            src="/images/collab-belgian-artisan.jpg"
            title="ベルギーの職人"
            desc="配合・テンパリング・ガナッシュ設計"
          />
        <Collaborator
            src="/images/collab-barcelona-designer.jpg"
            title="バルセロナのデザイナー"
            desc="モチーフ設計・型開発・配色"
          />
        </div>
        <p className="text-[11px] text-white/60 mt-3">
          写真は制作イメージです。記載の役割分担は実際の体制を示しますが、特定の建築家・機関による監修・承認を意味しません。
        </p>
      </section>

      {/* 商品（物理＋無形） */}
      <section className="px-6 py-10 max-w-xl mx-auto space-y-6">
        {/* 物理商品：ボンボン詰合せ */}
        <ProductCard
          image="/images/product-assortment.jpg"
          title="Gaudí Assortment – Bonbon Selection"
          price="¥4,600"
          ctaHref="#"
        >
          <p className="text-sm text-white/70 leading-relaxed">
            モザイクと曲線モチーフのボンボン詰合せ。<br />
            原材料（一部）：カカオマス、砂糖、カカオバター、ヘーゼルナッツ、オレンジピール／
            アレルゲン：乳・ナッツ／内容量：12粒（約120g）／賞味期限：出荷から21日。
            ※模様に個体差あり（写真は一例）
          </p>
          <div className="mt-3 text-xs text-white/60">
            価格は税込。配送料はチェックアウト時に計算（東京目安：常温 700円／クール 940円）。
          </div>
        </ProductCard>

        {/* 無形商材：デジタル支援パス */}
        <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5">
          <div className="p-5">
            <div className="text-lg font-semibold">Museum Support Pass（デジタル）</div>
            <p className="text-sm text-white/70 mt-2 leading-relaxed">
              制作メイキングの限定配信・先行公開・試食イベント抽選の参加権など。お礼のデジタルカード（メール）をお送りします。
              物理商品の配送は含みません。
            </p>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {([1200, 2400, 5000] as const).map((amt) => (
                <a key={amt} href="#" className="text-center rounded-full bg-white text-black py-2 text-sm font-semibold">
                  ¥{amt.toLocaleString()}
                </a>
              ))}
            </div>
            <div className="text-[11px] text-white/60 mt-3">
              *デジタル特典（動画・PDF・抽選応募権）をメールでお届けします。
            </div>
          </div>
        </div>
      </section>

      {/* レビュー */}
      <div className="px-6 max-w-xl mx-auto text-[11px] text-white/60">
        お客様の声（抜粋）※個人の感想であり、感じ方には個人差があります。写真はイメージです。
      </div>
      <section ref={scrollRef} className="bg-black/80 py-10 px-6 overflow-x-auto whitespace-nowrap scrollbar-hide">
        {reviews.map((r, i) => (
          <div key={i} className="inline-block align-top bg-white/5 border border-white/10 rounded-lg p-4 m-2 w-64">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold text-white/90">{r.name}</div>
              <div className="text-yellow-400 text-xs">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</div>
            </div>
            <p className="text-xs text-white/70 mt-2 leading-relaxed break-words whitespace-normal">{r.text}</p>
          </div>
        ))}
      </section>

      {/* FAQ（配送/返品/問い合わせ） */}
      <section className="px-6 py-10 max-w-xl mx-auto space-y-3 text-sm">
        <Details title="配送について">
          ご注文から2〜4営業日で出荷。夏季はクール便、冬季は常温便。日時指定はチェックアウトで選択可能です。
        </Details>
        <Details title="返品・交換">
          食品のためお客さま都合の返品はお受けできません。破損・誤配送は到着後2日以内に写真付きでご連絡ください。状態確認後、返金または再送いたします。
        </Details>
        <Details title="お問い合わせ">
          メール：info@example.com（平日10:00–17:00）／返信目安：1–2営業日
        </Details>
      </section>

      {/* Footer（特商法ミニ） */}
      <footer className="px-6 pb-12 border-t border-white/10 text-white/70 text-xs">
        <div>© {new Date().getFullYear()} Gaudí × Chocolate</div>
        <div className="mt-4 text-[11px] text-white/60 space-y-1">
          <div>販売業者：〇〇〇〇合同会社　運営責任者：山田太郎</div>
          <div>所在地：東京都〇〇区〇〇 1-2-3</div>
          <div>連絡先：info@example.com（返品連絡用）</div>
          <div>支払方法：各種クレジット／Apple Pay</div>
          <div>商品代金以外の必要料金：配送料、決済手数料（条件により）</div>
        </div>
      </footer>
    </div>
  );
}

/* ---------- Components ---------- */

function HeroPanel({ src, title, body }: { src: string; title: string; body: string }) {
  return (
    <section className="relative h-[60vh] sm:h-screen">
      <Image src={src} alt={title} fill className="object-cover" priority />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="absolute bottom-6 left-6 right-6">
        <h2 className="text-2xl font-bold leading-snug">{title}</h2>
        <p className="text-sm text-white/80 mt-2 leading-relaxed">{body}</p>
      </div>
    </section>
  );
}

function TrustBar() {
  return (
    <div className="mx-auto max-w-xl px-6 mt-6">
      <div className="grid grid-cols-3 gap-3 text-[11px] text-white/80">
        <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
          <div className="font-semibold">Secure Checkout</div>
          <div>SSL/TLS・主要カード/Apple Pay</div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
          <div className="font-semibold">冷蔵配送</div>
          <div>夏季クール便／日時指定可</div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
          <div className="font-semibold">小ロット製造</div>
          <div>シーズン限定・在庫僅少</div>
        </div>
      </div>
    </div>
  );
}

function Collaborator({ src, title, desc }: { src: string; title: string; desc: string }) {
  return (
    <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl p-3">
      <div className="relative h-12 w-12 rounded-full overflow-hidden ring-1 ring-white/20">
        <Image src={src} alt={title} fill className="object-cover" />
      </div>
      <div className="text-xs leading-relaxed">
        <div className="font-semibold">{title}</div>
        <div className="text-white/70">{desc}</div>
      </div>
    </div>
  );
}

function ProductCard({
  image, title, price, ctaHref, children,
}: {
  image: string; title: string; price: string; ctaHref: string; children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5">
      <div className="relative h-56">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>
      <div className="p-5">
        <div className="text-lg font-semibold">{title}</div>
        <div className="mt-2">{children}</div>
        <div className="mt-4 flex items-center justify-between">
          <div className="text-xl font-bold">{price}</div>
          <a href={ctaHref} className="px-5 py-2 rounded-full bg-white text-black text-sm font-semibold">カートに入れる</a>
        </div>
      </div>
    </div>
  );
}

function Details({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <details className="rounded-xl border border-white/10 bg-white/5 p-4">
      <summary className="cursor-pointer font-semibold">{title}</summary>
      <div className="mt-2 text-white/80">{children}</div>
    </details>
  );
}
