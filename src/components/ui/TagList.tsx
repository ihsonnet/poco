interface TagListProps {
  tags: string[];
  small?: boolean;
}

export function TagList({ tags, small = false }: TagListProps) {
  return (
    <div className={small ? 'tag-list tag-list-small' : 'tag-list'}>
      {tags.map((tag) => <span key={tag}>{tag}</span>)}
    </div>
  );
}
