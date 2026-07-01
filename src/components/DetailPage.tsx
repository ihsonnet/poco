import { getPostPrimaryHref, isExternalPost, type ContentPost } from '@/data/content';
import { ImageSlot } from '@/components/ui/ImageSlot';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { TagList } from '@/components/ui/TagList';

interface DetailPageProps {
  post: ContentPost;
  related: ContentPost[];
}

export function DetailPage({ post, related }: DetailPageProps) {
  return (
    <article className="detail-page">
      <Breadcrumbs items={[
        { label: post.type, href: `/view/${post.type}` },
        { label: post.slug }
      ]} />
      <header className="detail-hero">
        <div className="detail-cover">
          <ImageSlot slot={post.coverSlot} src={post.coverImageUrl} fit={post.coverFit ?? 'cover'} placeholder="Drop cover image" alt={post.title} />
        </div>
        <div className="detail-heading">
          <span className="section-eyebrow">{post.eyebrow}</span>
          <h1>{post.title}<span>/</span></h1>
          <p>{post.subtitle}</p>
          <div className="detail-meta">
            {post.year ? <span>{post.year}</span> : null}
            {post.location ? <span>{post.location}</span> : null}
            {post.status ? <span style={{ color: post.statusColor }}>{post.status}</span> : null}
          </div>
          <TagList tags={post.tags} />
        </div>
      </header>

      <div className="detail-layout">
        <aside className="detail-aside">
          <span>type</span>
          <b>{post.type}</b>
          <span>route</span>
          <b>/{post.route}/{post.slug}</b>
        </aside>

        <div className="detail-body">
          <p className="detail-lede">{post.excerpt}</p>
          {post.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}

          {post.attachments?.length ? (
            <div className="detail-attachments">
              <h2>attachments<span>/</span></h2>
              {post.attachments.map((attachment) => (
                <a href={attachment.href} key={attachment.href} target="_blank" rel="noreferrer">
                  <span>{attachment.type}</span>
                  <b>{attachment.label}</b>
                  <i>↗</i>
                </a>
              ))}
            </div>
          ) : null}

          {post.gallery?.length ? (
            <div className="detail-gallery">
              <h2>photo-gallery<span>/</span></h2>
              <div className="detail-gallery-grid">
                {post.gallery.map((image) => (
                  <figure key={`${image.imageUrl ?? image.slot}-${image.caption ?? image.alt}`}>
                    <div>
                      <ImageSlot slot={image.slot} src={image.imageUrl} placeholder="Drop gallery image" alt={image.alt} />
                    </div>
                    {image.caption ? <figcaption>{image.caption}</figcaption> : null}
                  </figure>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {related.length ? (
        <section className="related-posts">
          <div className="section-header section-header-compact">
            <div>
              <span className="section-eyebrow">matched by tags</span>
              <h2 className="section-title">related-records<span>/</span></h2>
            </div>
          </div>
          <div className="related-grid">
            {related.map((item) => (
              <a
                href={getPostPrimaryHref(item)}
                key={item.slug}
                target={isExternalPost(item) ? '_blank' : undefined}
                rel={isExternalPost(item) ? 'noreferrer' : undefined}
              >
                <div className="related-cover">
                  <ImageSlot slot={item.coverSlot} src={item.coverImageUrl} fit={item.coverFit ?? 'cover'} placeholder="Drop cover image" alt={item.title} />
                </div>
                <div className="related-copy">
                  <span>{item.eyebrow}</span>
                  <h3>{item.title}</h3>
                  <p>{item.subtitle}</p>
                  <i>open ↗</i>
                </div>
              </a>
            ))}
          </div>
        </section>
      ) : null}
    </article>
  );
}
