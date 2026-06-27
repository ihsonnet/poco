import type { AdminPost } from '@/lib/adminContent';

interface PostFormProps {
  action: (formData: FormData) => void | Promise<void>;
  post?: AdminPost;
  submitLabel: string;
}

function joinBody(post?: AdminPost) {
  return post?.body?.join('\n\n') ?? '';
}

function joinGallery(post?: AdminPost) {
  return post?.gallery?.map((image) => [image.slot, image.caption, image.alt].filter(Boolean).join('|')).join('\n') ?? '';
}

function joinAttachments(post?: AdminPost) {
  return post?.attachments?.map((attachment) => [attachment.label, attachment.href, attachment.type].join('|')).join('\n') ?? '';
}

export function PostForm({ action, post, submitLabel }: PostFormProps) {
  return (
    <form className="admin-form" action={action}>
      <div className="admin-form-grid">
        <label>
          <span>title</span>
          <input name="title" required defaultValue={post?.title ?? ''} />
        </label>
        <label>
          <span>slug</span>
          <input name="slug" defaultValue={post?.slug ?? ''} placeholder="auto from title" />
        </label>
        <label>
          <span>type</span>
          <select name="type" defaultValue={post?.type ?? 'project'}>
            {['activity', 'award', 'honor', 'judging', 'project', 'research', 'speaking', 'media', 'blog', 'leadership'].map((type) => <option key={type} value={type}>{type}</option>)}
          </select>
        </label>
        <label>
          <span>route</span>
          <select name="route" defaultValue={post?.route ?? 'details'}>
            <option value="details">details</option>
            <option value="blog">blog</option>
          </select>
        </label>
        <label>
          <span>subtitle</span>
          <input name="subtitle" defaultValue={post?.subtitle ?? ''} />
        </label>
        <label>
          <span>eyebrow</span>
          <input name="eyebrow" defaultValue={post?.eyebrow ?? ''} />
        </label>
        <label>
          <span>cover slot</span>
          <input name="coverSlot" defaultValue={post?.cover_slot ?? ''} placeholder="proj_space1" />
        </label>
        <label>
          <span>cover fit</span>
          <select name="coverFit" defaultValue={post?.cover_fit ?? 'cover'}>
            <option value="cover">cover</option>
            <option value="contain">contain</option>
          </select>
        </label>
        <label>
          <span>year</span>
          <input name="year" defaultValue={post?.year ?? ''} />
        </label>
        <label>
          <span>location</span>
          <input name="location" defaultValue={post?.location ?? ''} />
        </label>
        <label>
          <span>status</span>
          <input name="status" defaultValue={post?.status ?? ''} />
        </label>
        <label>
          <span>status color</span>
          <input name="statusColor" defaultValue={post?.status_color ?? ''} placeholder="#1a7f37" />
        </label>
        <label>
          <span>external URL</span>
          <input name="externalUrl" defaultValue={post?.external_url ?? ''} placeholder="https://example.com/source" />
        </label>
        <label>
          <span>sort order</span>
          <input name="sortOrder" type="number" defaultValue={post?.sort_order ?? 0} />
        </label>
        <label>
          <span>seo title</span>
          <input name="seoTitle" defaultValue={post?.seo_title ?? ''} />
        </label>
        <label>
          <span>post status</span>
          <select name="publicationStatus" defaultValue={post?.publication_status ?? 'draft'}>
            <option value="draft">draft</option>
            <option value="published">published</option>
            <option value="archived">archived</option>
          </select>
        </label>
      </div>

      <label>
        <span>excerpt</span>
        <textarea name="excerpt" rows={3} defaultValue={post?.excerpt ?? ''} />
      </label>
      <label>
        <span>body paragraphs</span>
        <textarea name="body" rows={9} defaultValue={joinBody(post)} placeholder="Separate paragraphs with a blank line." />
      </label>
      <label>
        <span>tags</span>
        <input name="tags" defaultValue={post?.tags?.join(', ') ?? ''} placeholder="project, space, NASA" />
      </label>
      <label>
        <span>gallery</span>
        <textarea name="gallery" rows={5} defaultValue={joinGallery(post)} placeholder="slot|caption|alt" />
      </label>
      <label>
        <span>attachments</span>
        <textarea name="attachments" rows={5} defaultValue={joinAttachments(post)} placeholder="Label|https://example.com|external" />
      </label>
      <label>
        <span>seo description</span>
        <textarea name="seoDescription" rows={3} defaultValue={post?.seo_description ?? ''} />
      </label>

      <div className="admin-checks">
        <label><input name="featured" type="checkbox" defaultChecked={post?.featured ?? false} /> featured</label>
      </div>

      <button className="admin-submit" type="submit">{submitLabel} ↗</button>
    </form>
  );
}
