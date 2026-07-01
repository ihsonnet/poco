import type { AdminPost } from '@/lib/adminContent';
import { ImageSlot } from '@/components/ui/ImageSlot';

interface PostFormProps {
  action: (formData: FormData) => void | Promise<void>;
  post?: AdminPost;
  submitLabel: string;
}

function joinBody(post?: AdminPost) {
  return post?.body?.join('\n\n') ?? '';
}

function joinGallery(post?: AdminPost) {
  return post?.gallery?.map((image) => [image.imageUrl ?? image.slot, image.caption, image.alt].filter(Boolean).join('|')).join('\n') ?? '';
}

function joinAttachments(post?: AdminPost) {
  return post?.attachments?.map((attachment) => [attachment.label, attachment.href, attachment.type].join('|')).join('\n') ?? '';
}

export function PostForm({ action, post, submitLabel }: PostFormProps) {
  const coverSlot = post?.cover_slot ?? '';
  const coverImageUrl = post?.cover_image_url ?? '';

  return (
    <form className="admin-form" action={action} encType="multipart/form-data">
      <div className="admin-editor-grid">
        <aside className="admin-media-panel">
          <div>
            <span className="admin-panel-kicker">visual source</span>
            <h2>cover-image<span>/</span></h2>
          </div>
          <div className="admin-cover-preview">
            <ImageSlot src={coverImageUrl || undefined} slot={coverSlot || undefined} fit={post?.cover_fit ?? 'cover'} placeholder="Drop cover image" alt={post?.title ?? 'Cover preview'} />
          </div>
          <label className="admin-upload">
            <span>upload cover</span>
            <input name="coverImage" type="file" accept="image/png,image/jpeg,image/webp,image/gif" />
            <small>JPG, PNG, WEBP, or GIF. Max 8MB.</small>
          </label>
          <label>
            <span>cover image URL</span>
            <input name="coverImageUrl" defaultValue={coverImageUrl} placeholder="/uploads/cover.webp" />
          </label>
          <label>
            <span>cover slot fallback</span>
            <input name="coverSlot" defaultValue={coverSlot} placeholder="proj_space1" />
          </label>
          <label>
            <span>cover fit</span>
            <select name="coverFit" defaultValue={post?.cover_fit ?? 'cover'}>
              <option value="cover">cover</option>
              <option value="contain">contain</option>
            </select>
          </label>
        </aside>

        <div className="admin-editor-main">
          <section className="admin-panel">
            <div className="admin-panel-head">
              <div>
                <span className="admin-panel-kicker">identity</span>
                <h2>post-basics<span>/</span></h2>
              </div>
              <label className="admin-featured-check">
                <input name="featured" type="checkbox" defaultChecked={post?.featured ?? false} />
                featured
              </label>
            </div>
            <div className="admin-form-grid">
              <label className="admin-field-title">
                <span>title</span>
                <input name="title" required defaultValue={post?.title ?? ''} />
              </label>
              <label className="admin-field-slug">
                <span>slug</span>
                <input name="slug" defaultValue={post?.slug ?? ''} placeholder="auto from title" />
              </label>
              <label className="admin-field-small">
                <span>type</span>
                <select name="type" defaultValue={post?.type ?? 'project'}>
                  {['activity', 'award', 'honor', 'judging', 'project', 'research', 'speaking', 'media', 'blog', 'leadership'].map((type) => <option key={type} value={type}>{type}</option>)}
                </select>
              </label>
              <label className="admin-field-small">
                <span>route</span>
                <select name="route" defaultValue={post?.route ?? 'details'}>
                  <option value="details">details</option>
                  <option value="blog">blog</option>
                </select>
              </label>
              <label className="admin-field-small">
                <span>post status</span>
                <select name="publicationStatus" defaultValue={post?.publication_status ?? 'draft'}>
                  <option value="draft">draft</option>
                  <option value="published">published</option>
                  <option value="archived">archived</option>
                </select>
              </label>
              <label className="admin-field-small">
                <span>sort order</span>
                <input name="sortOrder" type="number" defaultValue={post?.sort_order ?? 0} />
              </label>
              <label className="admin-field-title">
                <span>subtitle</span>
                <input name="subtitle" defaultValue={post?.subtitle ?? ''} />
              </label>
              <label className="admin-field-small">
                <span>eyebrow</span>
                <input name="eyebrow" defaultValue={post?.eyebrow ?? ''} />
              </label>
              <label className="admin-field-small">
                <span>year</span>
                <input name="year" defaultValue={post?.year ?? ''} />
              </label>
              <label className="admin-field-small">
                <span>location</span>
                <input name="location" defaultValue={post?.location ?? ''} />
              </label>
              <label className="admin-field-small">
                <span>display status</span>
                <input name="status" defaultValue={post?.status ?? ''} placeholder="Global Champion" />
              </label>
              <label className="admin-field-small">
                <span>status color</span>
                <input name="statusColor" defaultValue={post?.status_color ?? ''} placeholder="#1a7f37" />
              </label>
              <label className="admin-field-title">
                <span>external URL</span>
                <input name="externalUrl" defaultValue={post?.external_url ?? ''} placeholder="https://example.com/source" />
              </label>
            </div>
          </section>

          <section className="admin-panel">
            <div className="admin-panel-head">
              <div>
                <span className="admin-panel-kicker">story</span>
                <h2>content<span>/</span></h2>
              </div>
            </div>
            <label>
              <span>excerpt</span>
              <textarea name="excerpt" rows={3} defaultValue={post?.excerpt ?? ''} />
            </label>
            <label>
              <span>body paragraphs</span>
              <textarea name="body" rows={10} defaultValue={joinBody(post)} placeholder="Separate paragraphs with a blank line." />
            </label>
            <label>
              <span>tags</span>
              <input name="tags" defaultValue={post?.tags?.join(', ') ?? ''} placeholder="project, space, NASA" />
            </label>
          </section>

          <section className="admin-panel">
            <div className="admin-panel-head">
              <div>
                <span className="admin-panel-kicker">assets</span>
                <h2>gallery-&-links<span>/</span></h2>
              </div>
            </div>
            <label className="admin-upload">
              <span>upload gallery images</span>
              <input name="galleryImages" type="file" accept="image/png,image/jpeg,image/webp,image/gif" multiple />
              <small>New uploads are appended to the gallery list when you save.</small>
            </label>
            <label>
              <span>gallery records</span>
              <textarea name="gallery" rows={5} defaultValue={joinGallery(post)} placeholder="/uploads/photo.webp|Caption|Alt text&#10;slot_name|Caption|Alt text" />
            </label>
            <label>
              <span>attachments</span>
              <textarea name="attachments" rows={5} defaultValue={joinAttachments(post)} placeholder="Label|https://example.com|external" />
            </label>
          </section>

          <section className="admin-panel">
            <div className="admin-panel-head">
              <div>
                <span className="admin-panel-kicker">search</span>
                <h2>seo<span>/</span></h2>
              </div>
            </div>
            <label>
              <span>seo title</span>
              <input name="seoTitle" defaultValue={post?.seo_title ?? ''} />
            </label>
            <label>
              <span>seo description</span>
              <textarea name="seoDescription" rows={3} defaultValue={post?.seo_description ?? ''} />
            </label>
          </section>

          <div className="admin-submit-row">
            <button className="admin-submit" type="submit">{submitLabel} ↗</button>
            <a href="/admin/posts">cancel</a>
          </div>
        </div>
      </div>
    </form>
  );
}
