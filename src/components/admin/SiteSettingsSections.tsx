import { HOME_SECTION_ITEMS } from '@/lib/homeSections';
import { HomeSectionOrderEditor } from '@/components/admin/HomeSectionOrderEditor';
import type { SiteSettings } from '@/lib/siteSettings';
import { ThemeColorInput } from '@/components/admin/ThemeColorInput';
import { ImageSlot } from '@/components/ui/ImageSlot';

interface FormProps {
  action: (formData: FormData) => void | Promise<void>;
  settings: SiteSettings;
}

function joinNavItems(settings: SiteSettings) {
  return settings.navItems.map((item) => `${item.label}|${item.href}`).join('\n');
}

function joinHeroTags(settings: SiteSettings) {
  return settings.heroTags.join('\n');
}

const paletteFields = [
  ['bg', 'Background'],
  ['surface', 'Surface'],
  ['ink', 'Text'],
  ['inkSolid', 'Strong text / dark button'],
  ['muted', 'Muted text'],
  ['muted2', 'Secondary muted text'],
  ['border', 'Border'],
  ['borderFaint', 'Faint border'],
  ['primary', 'Primary accent'],
  ['secondaryButton', 'Secondary button'],
  ['tertiaryButton', 'Tertiary button'],
  ['chip', 'Decorative chip']
] as const;

export function SiteSettingsOverview() {
  const items = [
    {
      href: '/admin/site/header',
      kicker: 'global identity',
      title: 'header/',
      copy: 'Brand, navigation, contact email, and profile links.'
    },
    {
      href: '/admin/site/hero',
      kicker: 'landing section',
      title: 'hero/',
      copy: 'Portrait, name, status, intro copy, CTA, and hero tags.'
    },
    {
      href: '/admin/site/footer',
      kicker: 'closing area',
      title: 'footer/',
      copy: 'Footer wordmark, copyright text, and tagline.'
    },
    {
      href: '/admin/site/theme',
      kicker: 'design system',
      title: 'theme/',
      copy: 'Light and dark palette variables for the live site.'
    },
    {
      href: '/admin/site/home',
      kicker: 'homepage flow',
      title: 'home-order/',
      copy: 'Reorder the main homepage sections with drag and drop.'
    }
  ];

  return (
    <div className="admin-settings-hub">
      <section className="admin-panel">
        <div className="admin-panel-copy">
          <span className="admin-panel-kicker">settings overview</span>
          <h2>control-center<span>/</span></h2>
          <p>Use these focused pages to manage presentation details now, while keeping room for broader configuration decisions later.</p>
        </div>
        <div className="admin-settings-links">
          {items.map((item) => (
            <a key={item.href} href={item.href} className="admin-settings-link">
              <span className="admin-panel-kicker">{item.kicker}</span>
              <strong>{item.title}</strong>
              <p>{item.copy}</p>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}

export function SiteHeaderSettingsForm({ action, settings }: FormProps) {
  return (
    <form className="admin-form" action={action}>
      <section className="admin-panel admin-settings-single">
        <div className="admin-panel-copy">
          <span className="admin-panel-kicker">global identity</span>
          <h2>header<span>/</span></h2>
          <p>Manage the brand line, navigation, and the primary outbound links used in the top navigation.</p>
        </div>
        <div className="admin-form-grid">
          <label className="admin-field-small">
            <span>brand</span>
            <input name="brand" defaultValue={settings.brand} />
          </label>
          <label className="admin-field-small">
            <span>contact email</span>
            <input name="contactEmail" defaultValue={settings.contactEmail} />
          </label>
          <label className="admin-field-small">
            <span>GitHub URL</span>
            <input name="githubUrl" defaultValue={settings.githubUrl} />
          </label>
          <label className="admin-field-small">
            <span>LinkedIn URL</span>
            <input name="linkedinUrl" defaultValue={settings.linkedinUrl} />
          </label>
          <label className="admin-field-title">
            <span>nav items</span>
            <textarea name="navItems" rows={8} defaultValue={joinNavItems(settings)} placeholder={'Activity|#activity\nRecognition|#recognition'} />
          </label>
        </div>
        <div className="admin-submit-row">
          <button className="admin-submit" type="submit">save header ↗</button>
          <a href="/admin/site">back to settings</a>
        </div>
      </section>
    </form>
  );
}

export function SiteHeroSettingsForm({ action, settings }: FormProps) {
  return (
    <form className="admin-form" action={action} encType="multipart/form-data">
      <div className="admin-settings-grid">
        <aside className="admin-media-panel">
          <div className="admin-panel-copy">
            <span className="admin-panel-kicker">hero media</span>
            <h2>portrait<span>/</span></h2>
            <p>Upload the landing portrait and keep the fallback slot available for local seed content.</p>
          </div>
          <div className="admin-cover-preview">
            <ImageSlot
              src={settings.heroImageUrl || undefined}
              slot={settings.heroImageSlot || undefined}
              fit="cover"
              placeholder="Drop hero image"
              alt={`${settings.heroName} ${settings.heroLastName}`}
            />
          </div>
          <label className="admin-upload">
            <span>upload hero image</span>
            <input name="heroImage" type="file" accept="image/png,image/jpeg,image/webp,image/gif" />
            <small>Stored in structured `/uploads/site-hero/YYYY/MM` folders.</small>
          </label>
          <label>
            <span>hero image URL</span>
            <input name="heroImageUrl" defaultValue={settings.heroImageUrl} placeholder="/uploads/site-hero/2026/06/hero.webp" />
          </label>
          <label>
            <span>hero image slot fallback</span>
            <input name="heroImageSlot" defaultValue={settings.heroImageSlot} placeholder="hero_portrait" />
          </label>
        </aside>

        <section className="admin-panel admin-settings-single">
          <div className="admin-panel-copy">
            <span className="admin-panel-kicker">landing section</span>
            <h2>hero<span>/</span></h2>
            <p>Control the introduction copy, location and status row, CTA label, and supporting hero tags.</p>
          </div>
          <div className="admin-form-grid">
            <label className="admin-field-small">
              <span>first name line</span>
              <input name="heroName" defaultValue={settings.heroName} />
            </label>
            <label className="admin-field-small">
              <span>second name line</span>
              <input name="heroLastName" defaultValue={settings.heroLastName} />
            </label>
            <label className="admin-field-small">
              <span>location</span>
              <input name="heroLocation" defaultValue={settings.heroLocation} />
            </label>
            <label className="admin-field-small">
              <span>open status</span>
              <input name="heroStatus" defaultValue={settings.heroStatus} />
            </label>
            <label className="admin-field-title">
              <span>tagline</span>
              <input name="heroTagline" defaultValue={settings.heroTagline} />
            </label>
            <label className="admin-field-title">
              <span>lede</span>
              <textarea name="heroLede" rows={5} defaultValue={settings.heroLede} />
            </label>
            <label className="admin-field-title">
              <span>hero tags</span>
              <textarea name="heroTags" rows={6} defaultValue={joinHeroTags(settings)} placeholder={'software security engineer\nAI-first architect'} />
            </label>
            <label className="admin-field-small">
              <span>hero CTA label</span>
              <input name="heroViewWorkLabel" defaultValue={settings.heroViewWorkLabel} />
            </label>
            <label className="admin-field-title">
              <span>hero CTA href</span>
              <input name="heroViewWorkHref" defaultValue={settings.heroViewWorkHref} />
            </label>
          </div>
          <div className="admin-submit-row">
            <button className="admin-submit" type="submit">save hero ↗</button>
            <a href="/admin/site">back to settings</a>
          </div>
        </section>
      </div>
    </form>
  );
}

export function SiteFooterSettingsForm({ action, settings }: FormProps) {
  return (
    <form className="admin-form" action={action}>
      <section className="admin-panel admin-settings-single">
        <div className="admin-panel-copy">
          <span className="admin-panel-kicker">closing area</span>
          <h2>footer<span>/</span></h2>
          <p>These values appear in the shared footer and the closing parts of the public experience.</p>
        </div>
        <div className="admin-form-grid">
          <label className="admin-field-small">
            <span>footer wordmark</span>
            <input name="footerWordmark" defaultValue={settings.footerWordmark} />
          </label>
          <label className="admin-field-title">
            <span>copyright</span>
            <input name="footerCopyright" defaultValue={settings.footerCopyright} />
          </label>
          <label className="admin-field-title">
            <span>footer tagline</span>
            <input name="footerTagline" defaultValue={settings.footerTagline} />
          </label>
        </div>
        <div className="admin-submit-row">
          <button className="admin-submit" type="submit">save footer ↗</button>
          <a href="/admin/site">back to settings</a>
        </div>
      </section>
    </form>
  );
}

export function SiteThemeSettingsForm({ action, settings }: FormProps) {
  return (
    <form className="admin-form" action={action}>
      <section className="admin-panel admin-settings-single">
        <div className="admin-panel-copy">
          <span className="admin-panel-kicker">design system</span>
          <h2>theme<span>/</span></h2>
          <p>Manage both light and dark mode palette tokens. Every field accepts a hex code and includes a visual picker.</p>
        </div>

        <div className="admin-theme-grid">
          <section className="admin-theme-mode">
            <header>
              <span className="admin-panel-kicker">mode</span>
              <h3>light-mode<span>/</span></h3>
            </header>
            <div className="admin-color-grid">
              {paletteFields.map(([key, label]) => (
                <ThemeColorInput key={`light-${key}`} name={`themeLight.${key}`} label={label} value={settings.themeLight[key]} />
              ))}
            </div>
          </section>

          <section className="admin-theme-mode">
            <header>
              <span className="admin-panel-kicker">mode</span>
              <h3>dark-mode<span>/</span></h3>
            </header>
            <div className="admin-color-grid">
              {paletteFields.map(([key, label]) => (
                <ThemeColorInput key={`dark-${key}`} name={`themeDark.${key}`} label={label} value={settings.themeDark[key]} />
              ))}
            </div>
          </section>
        </div>

        <div className="admin-submit-row">
          <button className="admin-submit" type="submit">save theme ↗</button>
          <a href="/admin/site">back to settings</a>
        </div>
      </section>
    </form>
  );
}

export function SiteHomeOrderSettingsForm({ action, settings }: FormProps) {
  return (
    <form className="admin-form" action={action}>
      <section className="admin-panel admin-settings-single">
        <div className="admin-panel-copy">
          <span className="admin-panel-kicker">homepage flow</span>
          <h2>home-order<span>/</span></h2>
          <p>Change the order of the main homepage sections below. The intro area stays fixed, and these blocks render in the sequence you set here.</p>
        </div>

        <div className="admin-settings-note">
          <span>reorderable blocks</span>
          <strong>{HOME_SECTION_ITEMS.length} homepage sections</strong>
          <p>Activity, timeline, recognition, work, speaking, media, blog, CTA, and the other primary homepage blocks.</p>
        </div>

        <HomeSectionOrderEditor name="homeSectionOrder" value={settings.homeSectionOrder} />

        <div className="admin-submit-row">
          <button className="admin-submit" type="submit">save order ↗</button>
          <a href="/admin/site">back to settings</a>
        </div>
      </section>
    </form>
  );
}
