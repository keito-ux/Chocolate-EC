"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export default function Home() {
  /* ====== Reviews（文体・表記をばらす） ====== */
  const reviews = [
    { name: "佐藤 美優", rating: 5, text: "一粒めでふっと笑ってしまう香り。模様に揺らぎがあって、手で作ってるんだなって実感しました。" },
    { name: "Haruka Ito", rating: 5, text: "やさしい口どけ。カカオの余韻が長くて、夜に少しずつ食べるのが楽しみになりました。" },
    { name: "山田 玲央", rating: 4, text: "見た目の個体差はあるけど、それも含めて“今ロットの味”という感じ。贈り物にも使いたいです。" },
    { name: "Yuri S.", rating: 5, text: "箱を開けた瞬間の香りがすごく良い。食べ終わってもしばらく記憶に残るタイプでした。" },
    { name: "鈴木 たかし", rating: 5, text: "甘さが控えめでバランスがいい。後味が軽くて、次のひと粒に手が伸びます。" },
  ];

  /* ====== Auto scroll for reviews ====== */
  const scrollRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = scrollRef.current;
    let x = 0;
    const speed = 0.3;
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

  /* ====== 現在ロットID（表示用） ====== */
  const lot = new Date();
  const lotId = `${lot.getFullYear()}-${String(lot.getMonth() + 1).padStart(2, "0")}`;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Top bar */}
      <header className="sticky top-0 z-40 h-12 flex items-center px-4 bg-black/60 backdrop-blur border-b border-white/10">
        <div className="text-sm font-semibold tracking-wide">Gaudí × Chocolate — Seasonal Small Batch</div>
      </header>

      {/* HERO（1=少年/Barcelona、2=モザイク/Belgiumの仕事） */}
      <main className="grid grid-cols-1 sm:grid-cols-2">
        <HeroPanel
          src="/images/hero-boy.jpg"
          title="Barcelona：かたちを描く"
          body="バルセロナのデザインチームが、モザイクや鍛鉄を参照して型と配色を設計。街の色とリズムを一粒の中に写し取ります。"
        />
        <HeroPanel
          src="/images/barcelona-mosaic.png"
          title="Belgium：口どけを仕立てる"
          body="ベルギーで修行した職人が配合とテンパリングを担当。少量仕込みで冷却・熟成を行い、静かな余韻を目指しています。"
        />
      </main>

      {/* 支払いブランド（Stripeに合わせた簡易バッジ） */}
      <PayBrands />

      {/* コラボ紹介（注記は削除要望に合わせて非表示） */}
      <section className="px-6 pt-10 max-w-xl mx-auto">
        <h3 className="text-xl font-semibold mb-4">共同制作</h3>
        <div className="grid grid-cols-2 gap-4">
          <Collaborator
            src="/images/collab-belgian-artisan.jpg"
            title="ベルギーの職人"
            desc="配合・テンパリング・ガナッシュ"
          />
          <Collaborator
            src="/images/collab-barcelona-designer.jpg"
            title="バルセロナのデザイナー"
            desc="モチーフ設計・型開発・配色"
          />
        </div>
      </section>

      {/* 商品（配送料込みに変更） */}
      <section className="px-6 py-10 max-w-xl mx-auto space-y-6">
        <ProductCard
          image="/images/product-assortment.jpg"
          title="Gaudí Assortment – Bonbon Selection"
          price="¥4,600（配送料込み）"
          ctaHref="#"
        >
          <p className="text-sm text-white/70 leading-relaxed">
            モザイクと曲線モチーフのボンボン詰合せ。模様は手作業のため個体差があります。<br />
            原材料（一部）：カカオマス、砂糖、カカオバター、ヘーゼルナッツ、オレンジピール／
            アレルゲン：乳・ナッツ／内容量：12粒（約120g）／賞味期限：出荷から21日。
          </p>
          <div className="mt-2 text-[11px] text-white/60">ロット：{lotId}・少量生産</div>
          <details className="mt-3 rounded-lg border border-white/10 bg-white/5 p-3 text-xs">
            <summary className="cursor-pointer font-semibold">制作ノート</summary>
            <div className="text-white/80 mt-2">
              型の表面に薄く手彩色し、冷却後に一晩休ませてから箱詰め。色味・線の揺らぎはロットごとに少し異なります。
            </div>
          </details>
        </ProductCard>

        {/* デジタルパス（“配送含まず”の文言は削除） */}
        <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5">
          <div className="p-5">
            <div className="text-lg font-semibold">Museum Support Pass（デジタル）</div>
            <p className="text-sm text-white/70 mt-2 leading-relaxed">
              設計スケッチPDFや短い制作動画、次ロットの先行案内をメールでお届けします。
            </p>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {([1200, 2400, 5000] as const).map((amt) => (
                <a key={amt} href="#" className="text-center rounded-full bg-white text-black py-2 text-sm font-semibold">
                  ¥{amt.toLocaleString()}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* レビュー（注記は削除要望に合わせて非表示） */}
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

      {/* 配送・返品（最低限の案内。連絡先はメールのみ） */}
      <section className="px-6 py-10 max-w-xl mx-auto space-y-3 text-sm">
        <Details title="配送について">
          ご注文から2〜4営業日で出荷。夏季はクール便、冬季は常温便。価格は配送料込みです。
        </Details>
        <Details title="返品・交換">
          食品のためお客さま都合の返品はお受けできません。破損・誤配送は到着後2日以内に
          <a className="underline ml-1" href="mailto:chocolategaudi@gmail.com">chocolategaudi@gmail.com</a>
          まで写真を添えてご連絡ください。状態確認後に返金または再送いたします。
        </Details>
        <Details title="お問い合わせ">
          連絡先：
          <a className="underline ml-1" href="mailto:chocolategaudi@gmail.com">chocolategaudi@gmail.com</a>
          （平日10:00–17:00／返信目安1–2営業日）
        </Details>
      </section>

      {/* Footer（事業者情報の表示は削除＝すっきり。必要なら別ページで用意してね） */}
      <footer className="px-6 pb-12 border-t border-white/10 text-white/70 text-xs">
        <div>© {new Date().getFullYear()} Gaudí × Chocolate</div>
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

function PayBrands() {
  const brands = ["VISA", "Mastercard", "AMEX", "JCB", "Diners", "Discover", "Apple Pay"];
  return (
    <div className="mx-auto max-w-xl px-6 mt-6">
      <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
        <div className="text-xs text-white/70 mb-2">決済方法（Stripe）</div>
        <div className="flex flex-wrap gap-2">
          {brands.map((b) => (
            <span
              key={b}
              className="text-[11px] px-2.5 py-1 rounded-full border border-white/15 bg-black/30 text-white/85"
              aria-label={b}
              title={b}
            >
              {b}
            </span>
          ))}
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
