import Image from "next/image";
import Link from "next/link";
import s from "./News.module.css";
import { ArrowRight, ArrowUpRight } from "./icons";

export type NewsPost = {
  title: string;
  excerpt: string;
  image: string;
  href: string;
  /** Ma'lumotda hozircha yo'q — berilmasa kategoriya UI ko'rsatilmaydi */
  category?: string;
};

export type NewsCardT = { more: string; readMore: string };

export function NewsCard({ post, t }: { post: NewsPost; t: NewsCardT }) {
  return (
    <Link href={post.href} className={s.card} draggable={false}>
      <div className={s.media}>
        <Image src={post.image} alt="" fill quality={60} sizes="(max-width: 760px) 50vw, 390px" draggable={false} />
      </div>

      <div className={s.body}>
        <div className={s.row}>
          {post.category && <span className={s.category}>{post.category}</span>}
          <span className={s.badgeArrow} aria-hidden>
            <ArrowUpRight />
          </span>
        </div>
        <h3 className={s.cardTitle}>{post.title}</h3>
        {/* Faqat mobil: hover yo'q — ma'lumot karta ichida */}
        <p className={s.excerpt}>{post.excerpt}</p>
        <span className={s.more} aria-hidden>
          {t.more} <ArrowRight size={14} />
        </span>
      </div>

      {/* Faqat desktop: hover / focus qatlami (vizual takror — ekran o'quvchidan yashirin) */}
      <div className={s.overlay} aria-hidden>
        {post.category ? <span className={s.ovCategory}>{post.category}</span> : <span />}
        <p className={s.ovTitle}>{post.title}</p>
        <p className={s.ovExcerpt}>{post.excerpt}</p>
        <span className={s.ovMore}>
          {t.readMore} <ArrowRight />
        </span>
      </div>
    </Link>
  );
}
